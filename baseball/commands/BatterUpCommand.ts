import { GameCommand } from "./command";
import { GameEvent, BatterUpEvent } from "../events";
import { GameState } from "../aggregates/gameState";

export class BatterUpCommand extends GameCommand {
    constructor() {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkInGameCommand(state);
        if (state.atBat) { throw new Error("Batter is already at the plate."); }
        if (!this.validate(state)) { throw new Error("Game is in an invalid state for a new batter."); }

        events.push(new BatterUpEvent());
    }

    private validate(state: GameState): boolean {
        return state.firstBase.length <= 1 &&
            state.secondBase.length <= 1 &&
            state.thirdBase.length <= 1;
    }
}
