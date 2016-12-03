import { EventType } from "../../enums";
import { GameEvent } from "../../events/event";
import { addToLineUpEvolver } from "./addToLineUpEvolver";
import { advanceRunnerEvolver } from "./advanceRunnerEvolver";
import { assistedOutEvolver } from "./assistedOutEvolver";
import { batterUpEvolver } from "./batterUpEvolver";
import { gameOverEvolver } from "./gameOverEvolver";
import { inningEvolver } from "./inningEvolver";
import { inningHalfEvolver } from "./inningHalfEvolver";
import { outEvolver } from "./outEvolver";
import { removeFromLineUpEvolver } from "./removeFromLineUpEvolver";
import { runScoredEvolver } from "./runScoredEvolver";
import { startEvolver } from "./startEvolver";
import { GameState } from "./state";
import { unassistedOutEvolver } from "./unassistedOutEvolver";

export function evolve(event: GameEvent, state: GameState) {
    switch (event.type) {
        case EventType.AddToLineUp:
            addToLineUpEvolver(event, state);
            break;

        case EventType.AdvanceRunner:
            advanceRunnerEvolver(event, state);
            break;

        case EventType.AssistedOut:
            assistedOutEvolver(event, state);
            break;

        case EventType.BatterUp:
            batterUpEvolver(event, state);
            break;

        case EventType.GameOver:
            gameOverEvolver(event, state);
            break;

        case EventType.Inning:
            inningEvolver(event, state);
            break;

        case EventType.InningHalf:
            inningHalfEvolver(event, state);
            break;

        case EventType.Out:
            outEvolver(event, state);
            break;

        case EventType.RemoveFromLineUp:
            removeFromLineUpEvolver(event, state);
            break;

        case EventType.RunScored:
            runScoredEvolver(event, state);
            break;

        case EventType.Start:
            startEvolver(event, state);
            break;

        case EventType.FlyOut:
        case EventType.GroundOut:
        case EventType.LineOut:
            unassistedOutEvolver(event, state);
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
