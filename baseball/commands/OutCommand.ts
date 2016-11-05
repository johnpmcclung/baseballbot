import { GameEvent } from "../events";
import { GameCommand } from "./command";
import { GameState } from "../aggregates/gameState";
import { InningHalf, Team } from "../enums";
import { GameOverEvent, InningEvent, InningHalfEvent, OutEvent } from "../events";

export abstract class OutCommand extends GameCommand {
    do(events: Array<GameEvent>, state: GameState): void {
        if (state.outs !== 2) {
            events.push(new OutEvent(state.outs + 1));
            return;
        }

        events.push(new OutEvent(0));

        if (this.gameOverCheck(state)) {
            events.push(new GameOverEvent(state.homeScore > state.visitorScore ?
                Team.home : Team.visitor));
            return;
        }

        if (state.inningHalf === InningHalf.top) {
            events.push(new InningHalfEvent(InningHalf.bottom));
        } else if (state.inningHalf === InningHalf.bottom) {
            events.push(new InningHalfEvent(InningHalf.top));
            events.push(new InningEvent(state.inning + 1));
        } else {
            throw new Error("Game is not started or already ended.");
        }
    }

    private gameOverCheck(state: GameState): boolean {
        return (state.inning === 9 &&
            state.inningHalf === InningHalf.top &&
            state.homeScore > state.visitorScore) ||
            (state.inning >= 9 &&
                state.inningHalf === InningHalf.bottom &&
                state.homeScore !== state.visitorScore);
    }
}
