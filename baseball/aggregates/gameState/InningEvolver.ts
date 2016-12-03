import { InningEvent } from "../../events";
import { GameState } from "./state";

export function inningEvolver(event: InningEvent, state: GameState) : void {
    state.inning = event.properties.inningNumber;
}
