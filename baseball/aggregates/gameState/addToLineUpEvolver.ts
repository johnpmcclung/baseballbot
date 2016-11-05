import { AddToLineUpEvent } from "../../events";
import { Team } from "../../enums";
import { GameState } from "./state";

export function addToLineUpEvolver(event: AddToLineUpEvent, state: GameState): void {
    if(event.properties.team === Team.home) {
        state.homeLineUp.add(event.properties.player, event.properties.spot);
    } else {
        state.visitorLineUp.add(event.properties.player, event.properties.spot);
    }
}
