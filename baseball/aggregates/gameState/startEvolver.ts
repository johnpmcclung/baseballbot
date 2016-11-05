import { StartEvent } from "../../events";
import { GameState } from "./state";

export function startEvolver (event: StartEvent, state: GameState): void {
    state.started = true;
}
