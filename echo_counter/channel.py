from __future__ import annotations

import asyncio
import time

from .models import Packet


class LoopbackChannel:
    def __init__(self, base_delay_seconds: float = 0.08, transform_gain: float = 0.9) -> None:
        self.base_delay_seconds = base_delay_seconds
        self.transform_gain = transform_gain

    async def transmit(self, packet: Packet, channel_gain: float = 1.0, delay_steps: int = 0) -> Packet:
        await asyncio.sleep(self.base_delay_seconds * (1 + max(delay_steps, 0)))
        transformed = packet.sent_value * self.transform_gain * channel_gain
        out = Packet(
            seq=packet.seq,
            value=transformed,
            raw_input=packet.raw_input,
            sent_value=packet.sent_value,
            feedback_value=packet.feedback_value,
            feedback_components=dict(packet.feedback_components),
            transform_tag=f"loopback:g={self.transform_gain:.2f}:cg={channel_gain:.2f}",
            timestamp_sent=packet.timestamp_sent,
            timestamp_received=time.time(),
            state_snapshot=dict(packet.state_snapshot),
            channel_meta={"delay_steps": delay_steps, "channel_gain": channel_gain},
        )
        return out
