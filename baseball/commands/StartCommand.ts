import { GameState } from "../aggregates/gameState";
import { InningHalf } from "../enums";
import { GameEvent, InningEvent, InningHalfEvent, StartEvent } from "../events";
import { GameCommand } from "./command";

export class StartCommand extends GameCommand {
    do(state: GameState): Array<GameEvent> {
        if (state.started) { throw new Error("The game cannot be started again."); };
        if (state.gameOver) { throw new Error("The game cannot be started again."); };
        let events: Array<GameEvent> = [];
        events.push(new StartEvent());
        events.push(new InningEvent(1));
        events.push(new InningHalfEvent(InningHalf.top));
        return events;
    }
}
