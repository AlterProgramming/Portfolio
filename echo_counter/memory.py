from __future__ import annotations

from collections import deque
from statistics import mean
from typing import Iterable


def _safe_mean(values: Iterable[float]) -> float:
    data = list(values)
    return mean(data) if data else 0.0


class EchoMemory:
    def __init__(self, maxlen: int = 256) -> None:
        self.raw_echo_history: deque[float] = deque(maxlen=maxlen)
        self.transformed_echo_history: deque[float] = deque(maxlen=maxlen)
        self.sent_value_history: deque[float] = deque(maxlen=maxlen)
        self.received_value_history: deque[float] = deque(maxlen=maxlen)
        self.feedback_output_history: deque[float] = deque(maxlen=maxlen)
        self.energy_history: deque[float] = deque(maxlen=maxlen)

    def append_feedback(self, feedback: float) -> None:
        self.feedback_output_history.append(feedback)
        self.energy_history.append(abs(feedback))

    def append_sent(self, value: float) -> None:
        self.sent_value_history.append(value)

    def append_received(self, raw_echo: float, transformed_echo: float) -> None:
        self.raw_echo_history.append(raw_echo)
        self.transformed_echo_history.append(transformed_echo)
        self.received_value_history.append(transformed_echo)
        self.energy_history.append(abs(transformed_echo))

    @staticmethod
    def _tap(hist: deque[float], delay: int) -> float:
        if delay <= 0 or len(hist) < delay:
            return 0.0
        return hist[-delay]

    @staticmethod
    def _avg(hist: deque[float], window: int) -> float:
        if window <= 0:
            return 0.0
        return _safe_mean(list(hist)[-window:])

    def taps(self) -> dict[str, float]:
        latest = self._tap(self.transformed_echo_history, 1)
        prev = self._tap(self.transformed_echo_history, 2)
        tap2 = prev
        tap5 = self._tap(self.transformed_echo_history, 5)
        avg_short = self._avg(self.transformed_echo_history, 3)
        avg_long = self._avg(self.transformed_echo_history, 10)
        delta = latest - prev
        trend = avg_short - avg_long
        return {
            "tap_1": latest,
            "tap_2": tap2,
            "tap_5": tap5,
            "tap_avg_short": avg_short,
            "tap_avg_long": avg_long,
            "tap_delta": delta,
            "tap_trend": trend,
        }

    def summary(self) -> dict[str, float]:
        return {
            "echo_count": float(len(self.transformed_echo_history)),
            "latest_echo": self._tap(self.transformed_echo_history, 1),
            "avg_echo_short": self._avg(self.transformed_echo_history, 3),
            "avg_echo_long": self._avg(self.transformed_echo_history, 10),
            "latest_feedback": self._tap(self.feedback_output_history, 1),
            "avg_energy": self._avg(self.energy_history, 10),
        }
