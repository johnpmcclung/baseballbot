import { OutEvent } from "../../events";
import { GameState } from "./state";

export function outEvolver (event: OutEvent, state: GameState): void {
    state.outs = event.properties.outs;
}
