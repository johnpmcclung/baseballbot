import { EventType, GameState } from "./index";
import { advanceRunnerEventEvolver } from "./BaseRunning/AdvanceRunnerEvent";
import { assistedOutEventEvolver } from "./Outs/AssistedOutCommand";
import { batterUpEventEvolver } from "./BatterUp/BatterUpEvent";
import { gameOverEventEvolver } from "./Innings/GameOverEvent";
import { inningEventEvolver } from "./Innings/InningEvent";
import { inningHalfEventEvolver } from "./Innings/InningHalfEvent";
import { outEventEvolver } from "./Outs/OutEvent";
import { runScoredEventEvolver } from "./Scoring/RunScoredEvent";
import { startEventEvolver } from "./Start/StartEvent";
import { unassistedOutEventEvolver } from "./Outs/UnassistedOutEvents";

export interface GameEvent {
    type: EventType;
    properties: any;
}

export function evolve(event: GameEvent, state: GameState) {
    switch (event.type) {
        case EventType.AdvanceRunner:
            advanceRunnerEventEvolver(event, state);
            break;

        case EventType.AssistedOut:
            assistedOutEventEvolver(event, state);
            break;

        case EventType.BatterUp:
            batterUpEventEvolver(event, state);
            break;

        case EventType.GameOver:
            gameOverEventEvolver(event, state);
            break;

        case EventType.Inning:
            inningEventEvolver(event, state);
            break;

        case EventType.InningHalf:
            inningHalfEventEvolver(event, state);
            break;

        case EventType.Out:
            outEventEvolver(event, state);
            break;

        case EventType.RunScored:
            runScoredEventEvolver(event, state);
            break;

        case EventType.Start:
            startEventEvolver(event, state);
            break;

        case EventType.FlyOut:
        case EventType.GroundOut:
        case EventType.LineOut:
            unassistedOutEventEvolver(event, state);
            break;

        case EventType.Single:
        case EventType.Double:
        case EventType.Triple:
        case EventType.Homerun:
            // no evolver
            break;

        default:
            throw new Error("Event type does not have an evolver");
    }
}
