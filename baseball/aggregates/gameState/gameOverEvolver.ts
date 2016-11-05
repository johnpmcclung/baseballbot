import { GameEvent } from "../../events";
import { GameState } from "./state";

export function gameOverEvolver (event: GameEvent, state: GameState): void {
    state.gameOver = true;
    state.winner = event.properties.winner;
}
