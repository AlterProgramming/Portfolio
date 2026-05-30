from __future__ import annotations

import argparse
import asyncio
import json
import random
from dataclasses import dataclass

from .system import EchoSystem, json_logger


def monotonic_counting(length: int = 16) -> list[float]:
    return [float(i) / 3.0 for i in range(length)]


def pulsing_periodic(length: int = 20) -> list[float]:
    base = [0.0, 1.0, 0.0, -1.0]
    return [base[i % len(base)] for i in range(length)]


def noisy_input(length: int = 20) -> list[float]:
    random.seed(7)
    return [0.6 + random.uniform(-0.8, 0.8) for _ in range(length)]


def repeated_plateau(length: int = 20) -> list[float]:
    pattern = [0.0] * 4 + [1.4] * 4 + [0.3] * 4 + [1.4] * 4 + [0.0] * 4
    return pattern[:length]


SCENARIOS = {
    "monotonic": monotonic_counting,
    "pulsing": pulsing_periodic,
    "noisy": noisy_input,
    "plateau": repeated_plateau,
}


@dataclass
class DemoRunner:
    modes: list[str]
    scenario: str
    length: int

    async def run(self) -> None:
        values = SCENARIOS[self.scenario](self.length)
        print(json.dumps({"event": "scenario_start", "scenario": self.scenario, "length": self.length, "modes": self.modes}))
        for mode in self.modes:
            print(json.dumps({"event": "mode_start", "mode": mode, "scenario": self.scenario}))
            system = EchoSystem.build(mode)
            await system.run(values, json_logger)


def main() -> None:
    parser = argparse.ArgumentParser(description="Echo counter feedback demos")
    parser.add_argument("--scenario", choices=SCENARIOS.keys(), default="monotonic")
    parser.add_argument("--length", type=int, default=12)
    parser.add_argument(
        "--modes",
        nargs="+",
        default=["echo_follow", "echo_resonance", "echo_suppression", "trend_sensitive", "cross_term"],
    )
    args = parser.parse_args()
    asyncio.run(DemoRunner(modes=args.modes, scenario=args.scenario, length=args.length).run())


if __name__ == "__main__":
    main()
