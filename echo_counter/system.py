from __future__ import annotations

import asyncio
import json
import time
from dataclasses import dataclass
from typing import Callable

from .channel import LoopbackChannel
from .feedback import FeedbackEngine
from .memory import EchoMemory
from .models import Packet


@dataclass
class EchoSystem:
    mode: str
    channel: LoopbackChannel
    memory: EchoMemory
    feedback_engine: FeedbackEngine

    @classmethod
    def build(cls, mode: str) -> "EchoSystem":
        return cls(
            mode=mode,
            channel=LoopbackChannel(),
            memory=EchoMemory(),
            feedback_engine=FeedbackEngine.for_mode(mode),
        )

    async def step(self, seq: int, raw_input: float) -> dict:
        now = time.time()
        feedback = self.feedback_engine.compute_feedback(raw_input, self.memory, now)

        additive_term = feedback.metrics["additive_total"]
        multiplicative_term = raw_input * (feedback.metrics["multiplicative_total"] - 1.0)
        suppressive_term = max(0.0, abs(feedback.metrics.get("tap_1", 0.0)) - 1.1) * 0.3
        sent_value = raw_input + additive_term + multiplicative_term - suppressive_term

        packet = Packet(
            seq=seq,
            value=sent_value,
            raw_input=raw_input,
            sent_value=sent_value,
            feedback_value=feedback.total_feedback,
            feedback_components=feedback.component_breakdown,
            transform_tag=f"emit:{self.mode}:{feedback.transform_tag}",
            timestamp_sent=now,
            state_snapshot={
                "mode": self.mode,
                "memory_summary": self.memory.summary(),
                "gates": feedback.gates_triggered,
                "component_details": feedback.component_details,
            },
            channel_meta={
                "intended_channel_gain": feedback.adjusted_channel_gain,
                "intended_delay_steps": feedback.adjusted_delay_steps,
                "memory_weight": feedback.memory_weight,
            },
        )

        self.memory.append_feedback(feedback.total_feedback)
        self.memory.append_sent(sent_value)

        echoed = await self.channel.transmit(
            packet,
            channel_gain=feedback.adjusted_channel_gain,
            delay_steps=feedback.adjusted_delay_steps,
        )

        weighted = echoed.value * feedback.memory_weight
        self.memory.append_received(raw_echo=echoed.value, transformed_echo=weighted)

        log_entry = {
            "event": "echo_step",
            "seq": seq,
            "mode": self.mode,
            "raw_input": raw_input,
            "feedback": {
                "total_feedback": feedback.total_feedback,
                "components": feedback.component_breakdown,
                "component_details": feedback.component_details,
                "gates": feedback.gates_triggered,
                "metrics": feedback.metrics,
            },
            "sent_value": sent_value,
            "received_echo": echoed.value,
            "weighted_echo": weighted,
            "packet": {
                "seq": packet.seq,
                "raw_input": packet.raw_input,
                "sent_value": packet.sent_value,
                "feedback_value": packet.feedback_value,
                "feedback_components": packet.feedback_components,
                "transform_tag": packet.transform_tag,
                "timestamp_sent": packet.timestamp_sent,
                "timestamp_received": echoed.timestamp_received,
                "state_snapshot": packet.state_snapshot,
                "channel_meta": echoed.channel_meta,
            },
            "memory_summary": self.memory.summary(),
        }
        return log_entry

    async def run(self, values: list[float], logger: Callable[[dict], None]) -> None:
        for seq, raw in enumerate(values):
            logger(await self.step(seq, raw))
            await asyncio.sleep(0.02)


def json_logger(event: dict) -> None:
    print(json.dumps(event, sort_keys=True))
