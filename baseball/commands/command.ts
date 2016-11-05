import { GameEvent } from "../events";
import { GameState } from "../aggregates/gameState";

export abstract class GameCommand {
    abstract do(events: Array<GameEvent>, state: GameState): void;

    protected checkInGameCommand(state: GameState) {
        if (!state.started) { throw new Error("Game has not started."); };
        if (state.gameOver) { throw new Error("Game has already finished."); };
    }

    protected checkAtBatCommand(state: GameState) {
        this.checkInGameCommand(state);
        if (state.atBat === null) { throw new Error("There is no batter at the plate."); }
    }
}
