import { Team } from "../../enums";
import { RemoveFromLineUpEvent } from "../../events";
import { GameState } from "./state";

export function removeFromLineUpEvolver(event: RemoveFromLineUpEvent, state: GameState): void {
    if(event.properties.team === Team.home) {
        state.homeLineUp.remove(event.properties.player);
    } else if(event.properties.team === Team.visitor) {
        state.visitorLineUp.remove(event.properties.player);
    }
}