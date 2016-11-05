import { GameState } from "./state";
import { InningHalfEvent } from "../../events";

export function inningHalfEvolver(event: InningHalfEvent, state: GameState): void {
    state.inningHalf = event.properties.inningHalf;
}
