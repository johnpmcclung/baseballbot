import { GameCommand } from "../command";
import { GameState } from "../state";
import { InningHalf } from "../enums";
import { GameEvent } from "../event";
import { StartEvent } from "../Start/StartEvent";
import { InningEvent } from "../Innings/InningEvent";
import { InningHalfEvent } from "../Innings/InningHalfEvent";

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
