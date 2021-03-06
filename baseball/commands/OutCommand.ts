import { GameState } from "../aggregates/gameState";
import { InningHalf, Team } from "../enums";
import { GameEvent } from "../events";
import { GameOverEvent, InningEvent, InningHalfEvent, OutEvent } from "../events";
import { GameCommand } from "./command";

export abstract class OutCommand extends GameCommand {
    do(state: GameState): Array<GameEvent> {
        let events: Array<GameEvent> = [];
        if (state.outs !== 2) {
            events.push(new OutEvent(state.outs + 1));
            return events;
        }

        events.push(new OutEvent(0));

        if (this.gameOverCheck(state)) {
            events.push(new GameOverEvent(state.homeScore > state.visitorScore ?
                Team.home : Team.visitor));
            return events;
        }

        if (state.inningHalf === InningHalf.top) {
            events.push(new InningHalfEvent(InningHalf.bottom));
        } else if (state.inningHalf === InningHalf.bottom) {
            events.push(new InningHalfEvent(InningHalf.top));
            events.push(new InningEvent(state.inning + 1));
        } else {
            throw new Error("Game is not started or already ended.");
        }
        return events;
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
