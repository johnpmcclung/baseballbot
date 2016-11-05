import { GameCommand } from "./command";
import { GameState } from "../aggregates/gameState";
import { InningHalf } from "../enums";
import { GameEvent, InningEvent, InningHalfEvent, StartEvent } from "../events";

export class StartCommand extends GameCommand {
    do(events: Array<GameEvent>, state: GameState) {
        if (state.started) { throw new Error("The game cannot be started again."); };
        if (state.gameOver) { throw new Error("The game cannot be started again."); };
        events.push(new StartEvent());
        events.push(new InningEvent(1));
        events.push(new InningHalfEvent(InningHalf.top));
        return events;
    }
}
