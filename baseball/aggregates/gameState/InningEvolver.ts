import { GameState } from "./state";
import { InningEvent } from "../../events";

export function inningEvolver(event: InningEvent, state: GameState) : void {
    state.inning = event.properties.inningNumber;
}
