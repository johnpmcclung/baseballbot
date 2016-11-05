import { UnassistedOutEvent } from "../../events";
import { GameState } from "./state";

export function unassistedOutEvolver (event: UnassistedOutEvent, state: GameState): void {
    state.atBat = null;
}
