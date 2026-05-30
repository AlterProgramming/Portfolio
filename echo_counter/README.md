# Echo Counter Feedback System

Local asyncio loopback system where emitted values return as delayed echoes and shape future emissions through compositional feedback rules.

## Core architecture

- `Packet` metadata model with `raw_input`, `sent_value`, `feedback_value`, `feedback_components`, `transform_tag`, timestamps, and snapshots.
- `EchoMemory` with parallel traces: raw echo, transformed echo, sent values, received values, feedback outputs, and energy.
- `FeedbackRule` composable unit (source signals, delay taps, transforms, gain, combine mode, condition gate, stochastic gate, hysteresis, decay accumulator).
- `FeedbackEngine.compute_feedback(raw_input, memory, current_time)` returns structured `FeedbackResult` with totals, per-component details, mode gates, and modulation outputs.
- `LoopbackChannel` local delayed transport (no BLE) with feedback-adjusted gain/delay.
- `EchoSystem` orchestrator applying feedback to outgoing send path, channel behavior, memory update weighting, and structured JSON logs.
- `DemoRunner` for monotonic, pulsing, noisy, and plateau scenarios.

## Modes

- `echo_follow`: past echoes gently pull current emissions toward prior state.
- `echo_resonance`: recurring alignments get amplified/stabilized via similarity/alignment terms.
- `echo_suppression`: strong echoes inhibit similar future emissions (refractory damping).
- `trend_sensitive`: trend and delta taps bias behavior for rising vs fading echoes.
- `cross_term`: current input multiplicatively couples with delayed memory traces.

## Run

```bash
python -m echo_counter.demo --scenario monotonic --length 8
python -m echo_counter.demo --scenario pulsing --modes echo_resonance cross_term
python -m echo_counter.demo --scenario plateau --modes echo_suppression trend_sensitive
```

## Extending toward BLE later

Keep `EchoSystem`, `EchoMemory`, and `FeedbackEngine` unchanged; only swap `LoopbackChannel` with a `BLEChannel` implementing the same transmit contract and preserving packet metadata + structured event logging.
