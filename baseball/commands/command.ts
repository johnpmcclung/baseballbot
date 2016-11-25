import { GameEvent } from "../events";
import { GameState } from "../aggregates/gameState";

export abstract class GameCommand {
    abstract do(state: GameState): Array<GameEvent>;

    protected checkInGameCommand(state: GameState) {
        if (!state.started) { throw new Error("Game has not started."); };
        if (state.gameOver) { throw new Error("Game has already finished."); };
    }

    protected checkAtBatCommand(state: GameState) {
        this.checkInGameCommand(state);
        if (state.atBat === null) { throw new Error("There is no batter at the plate."); }
    }
}
