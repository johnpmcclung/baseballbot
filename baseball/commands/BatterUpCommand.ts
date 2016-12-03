import { GameState } from "../aggregates/gameState";
import { BatterUpEvent, GameEvent } from "../events";
import { GameCommand } from "./command";

export class BatterUpCommand extends GameCommand {
    constructor() {
        super();
    }

    do(state: GameState): Array<GameEvent> {
        super.checkInGameCommand(state);
        if (state.atBat) { throw new Error("Batter is already at the plate."); }
        if (!this.validate(state)) { throw new Error("Game is in an invalid state for a new batter."); }

        return [new BatterUpEvent()];
    }

    private validate(state: GameState): boolean {
        return state.firstBase.length <= 1 &&
            state.secondBase.length <= 1 &&
            state.thirdBase.length <= 1;
    }
}
