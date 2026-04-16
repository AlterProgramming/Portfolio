from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(slots=True)
class Packet:
    seq: int
    value: float
    raw_input: float
    sent_value: float
    feedback_value: float
    feedback_components: dict[str, float]
    transform_tag: str
    timestamp_sent: float
    timestamp_received: float | None = None
    state_snapshot: dict[str, Any] = field(default_factory=dict)
    channel_meta: dict[str, Any] = field(default_factory=dict)


@dataclass(slots=True)
class FeedbackResult:
    total_feedback: float
    component_breakdown: dict[str, float]
    component_details: dict[str, dict[str, float | str | bool]]
    mode: str
    gates_triggered: list[str]
    metrics: dict[str, float]
    adjusted_channel_gain: float = 1.0
    adjusted_delay_steps: int = 0
    memory_weight: float = 1.0
    transform_tag: str = "feedback:default"
