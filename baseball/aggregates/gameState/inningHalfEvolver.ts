import { InningHalfEvent } from "../../events";
import { GameState } from "./state";

export function inningHalfEvolver(event: InningHalfEvent, state: GameState): void {
    state.inningHalf = event.properties.inningHalf;
}
