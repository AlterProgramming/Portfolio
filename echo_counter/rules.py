from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Callable


def tanh(x: float) -> float:
    return math.tanh(x)


def sigmoid(x: float) -> float:
    return 1.0 / (1.0 + math.exp(-x))


def softsign(x: float) -> float:
    return x / (1.0 + abs(x))


def clamp(x: float, lo: float = -1.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, x))


def dead_zone(x: float, threshold: float = 0.05) -> float:
    return 0.0 if abs(x) < threshold else x


def inverse_distance_similarity(a: float, b: float) -> float:
    return 1.0 / (1.0 + abs(a - b))


def sign_agreement(a: float, b: float) -> float:
    return 1.0 if (a == 0.0 and b == 0.0) or (a * b > 0.0) else -1.0


Transform = Callable[[float], float]
Condition = Callable[[dict[str, float], float], bool]
Compute = Callable[[dict[str, float], float, dict[str, float]], float]


@dataclass
class RuleState:
    hysteresis: float = 0.0
    accumulator: float = 0.0


@dataclass
class FeedbackRule:
    name: str
    source_signals: tuple[str, ...]
    delay_taps: tuple[str, ...]
    compute: Compute
    transform_pipeline: list[Transform] = field(default_factory=list)
    gain: float = 1.0
    combine_mode: str = "add"
    condition: Condition | None = None
    decay: float = 0.0
    stochastic_gate: float = 1.0
    hysteresis_strength: float = 0.0
    state: RuleState = field(default_factory=RuleState)

    def evaluate(self, taps: dict[str, float], raw_input: float, context: dict[str, float], rnd: float) -> tuple[float, bool]:
        if self.condition and not self.condition(taps, raw_input):
            return 0.0, False
        if rnd > self.stochastic_gate:
            return 0.0, False

        value = self.compute(taps, raw_input, context)

        if self.hysteresis_strength:
            h = clamp(self.hysteresis_strength, 0.0, 0.99)
            self.state.hysteresis = h * self.state.hysteresis + (1.0 - h) * value
            value = self.state.hysteresis

        for transform in self.transform_pipeline:
            value = transform(value)

        if self.decay:
            self.state.accumulator = (1.0 - self.decay) * self.state.accumulator + value
            value = self.state.accumulator

        value *= self.gain

        if self.combine_mode == "subtract":
            value = -value
        elif self.combine_mode == "multiply":
            value = max(-0.95, min(3.0, value))

        return value, True
