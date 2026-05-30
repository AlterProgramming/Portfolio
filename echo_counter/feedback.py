from __future__ import annotations

import random
from dataclasses import dataclass, field

from .memory import EchoMemory
from .models import FeedbackResult
from .rules import FeedbackRule, clamp, dead_zone, inverse_distance_similarity, sign_agreement, sigmoid, softsign, tanh


@dataclass
class FeedbackEngine:
    mode: str
    rules: list[FeedbackRule]
    rng: random.Random = field(default_factory=lambda: random.Random(17))

    @classmethod
    def for_mode(cls, mode: str) -> "FeedbackEngine":
        mode = mode.lower().strip()
        if mode == "echo_follow":
            rules = [
                FeedbackRule(
                    name="follow_latest",
                    source_signals=("raw_input",),
                    delay_taps=("tap_1", "tap_avg_short"),
                    compute=lambda taps, _raw, _ctx: 0.75 * taps["tap_1"] + 0.25 * taps["tap_avg_short"],
                    transform_pipeline=[softsign],
                    gain=0.55,
                    decay=0.12,
                    hysteresis_strength=0.35,
                ),
                FeedbackRule(
                    name="slow_gravity",
                    source_signals=("raw_input",),
                    delay_taps=("tap_avg_long",),
                    compute=lambda taps, _raw, _ctx: taps["tap_avg_long"],
                    transform_pipeline=[lambda x: clamp(x, -2.0, 2.0)],
                    gain=0.20,
                    decay=0.18,
                ),
            ]
        elif mode == "echo_resonance":
            rules = [
                FeedbackRule(
                    name="resonant_similarity",
                    source_signals=("raw_input",),
                    delay_taps=("tap_1",),
                    compute=lambda taps, raw, _ctx: inverse_distance_similarity(raw, taps["tap_1"]) * taps["tap_1"],
                    transform_pipeline=[tanh],
                    gain=0.95,
                    hysteresis_strength=0.15,
                ),
                FeedbackRule(
                    name="pattern_alignment",
                    source_signals=("raw_input",),
                    delay_taps=("tap_2", "tap_5"),
                    compute=lambda taps, raw, _ctx: sign_agreement(raw, taps["tap_2"]) * (0.7 * abs(taps["tap_2"]) + 0.3 * abs(taps["tap_5"])),
                    transform_pipeline=[lambda x: clamp(x, -1.6, 1.6)],
                    gain=0.4,
                ),
                FeedbackRule(
                    name="resonant_gate",
                    source_signals=("raw_input",),
                    delay_taps=("tap_delta",),
                    compute=lambda taps, _raw, _ctx: sigmoid(2.5 * (0.4 - abs(taps["tap_delta"]))),
                    gain=0.15,
                    combine_mode="multiply",
                ),
            ]
        elif mode == "echo_suppression":
            rules = [
                FeedbackRule(
                    name="magnitude_damping",
                    source_signals=("raw_input",),
                    delay_taps=("tap_1",),
                    compute=lambda taps, _raw, _ctx: max(0.0, abs(taps["tap_1"]) - 0.32),
                    transform_pipeline=[lambda x: clamp(x, 0.0, 2.2)],
                    gain=0.92,
                    combine_mode="subtract",
                ),
                FeedbackRule(
                    name="refractory_hysteresis",
                    source_signals=("raw_input",),
                    delay_taps=("tap_avg_short",),
                    compute=lambda taps, _raw, _ctx: abs(taps["tap_avg_short"]),
                    transform_pipeline=[dead_zone],
                    gain=0.35,
                    combine_mode="subtract",
                    hysteresis_strength=0.70,
                    condition=lambda taps, _raw: abs(taps["tap_avg_short"]) > 0.08,
                ),
            ]
        elif mode == "trend_sensitive":
            rules = [
                FeedbackRule(
                    name="trend_boost",
                    source_signals=("raw_input",),
                    delay_taps=("tap_trend",),
                    compute=lambda taps, _raw, _ctx: taps["tap_trend"],
                    transform_pipeline=[tanh],
                    gain=0.85,
                ),
                FeedbackRule(
                    name="fade_bias",
                    source_signals=("raw_input",),
                    delay_taps=("tap_delta",),
                    compute=lambda taps, _raw, _ctx: -0.4 * taps["tap_delta"],
                    transform_pipeline=[softsign],
                    gain=0.35,
                    stochastic_gate=0.94,
                ),
            ]
        elif mode == "cross_term":
            rules = [
                FeedbackRule(
                    name="multiplicative_coupling",
                    source_signals=("raw_input",),
                    delay_taps=("tap_1",),
                    compute=lambda taps, raw, _ctx: raw * tanh(taps["tap_1"]),
                    transform_pipeline=[lambda x: clamp(x, -2.0, 2.0)],
                    gain=0.75,
                ),
                FeedbackRule(
                    name="long_memory_cross",
                    source_signals=("raw_input",),
                    delay_taps=("tap_5", "tap_avg_long"),
                    compute=lambda taps, raw, _ctx: raw * softsign(0.7 * taps["tap_5"] + 0.3 * taps["tap_avg_long"]),
                    gain=0.35,
                    decay=0.22,
                ),
            ]
        else:
            raise ValueError(f"Unknown feedback mode: {mode}")
        return cls(mode=mode, rules=rules)

    def compute_feedback(self, raw_input: float, memory: EchoMemory, current_time: float) -> FeedbackResult:
        taps = memory.taps()
        context = {"time": current_time, "raw": raw_input}
        components: dict[str, float] = {}
        details: dict[str, dict[str, float | str | bool]] = {}
        triggered: list[str] = []

        additive_total = 0.0
        multiplicative_total = 1.0

        for rule in self.rules:
            value, active = rule.evaluate(taps, raw_input, context, self.rng.random())
            components[rule.name] = value
            if rule.combine_mode == "multiply":
                multiplicative_total *= 1.0 + value
            else:
                additive_total += value
            details[rule.name] = {
                "value": value,
                "active": active,
                "gain": rule.gain,
                "combine_mode": rule.combine_mode,
            }
            if active:
                triggered.append(rule.name)

        total = additive_total * multiplicative_total
        metrics = {
            **taps,
            "raw_input": raw_input,
            "additive_total": additive_total,
            "multiplicative_total": multiplicative_total,
            "feedback_energy": abs(total),
        }

        adjusted_channel_gain = 1.0 + 0.22 * tanh(total)
        adjusted_delay_steps = 1 if abs(taps.get("tap_delta", 0.0)) > 0.45 else 0
        memory_weight = 0.75 if abs(total) > 1.4 else 1.0

        return FeedbackResult(
            total_feedback=total,
            component_breakdown=components,
            component_details=details,
            mode=self.mode,
            gates_triggered=triggered,
            metrics=metrics,
            adjusted_channel_gain=adjusted_channel_gain,
            adjusted_delay_steps=adjusted_delay_steps,
            memory_weight=memory_weight,
            transform_tag=f"feedback:{self.mode}",
        )
