import { Team } from "../../enums";
import { RunScoredEvent } from "../../events";
import { GameState } from "./state";

export function runScoredEvolver (event: RunScoredEvent, state: GameState): void {
    if (event.properties.team === Team.home) { state.homeScore += 1; }
    if (event.properties.team === Team.visitor) { state.visitorScore += 1; }
}
