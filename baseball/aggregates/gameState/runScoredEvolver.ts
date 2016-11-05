import { GameState } from "./state";
import { RunScoredEvent } from "../../events";
import { Team } from "../../enums";

export function runScoredEvolver (event: RunScoredEvent, state: GameState): void {
    if (event.properties.team === Team.home) { state.homeScore += 1; }
    if (event.properties.team === Team.visitor) { state.visitorScore += 1; }
}
