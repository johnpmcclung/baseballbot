import { GameCommand } from "./command";
import { GameEvent, LineOutEvent } from "../events";
import { GameState } from "../aggregates/gameState";
import { OutCommand } from "./OutCommand";
import { Player } from "../player";

export class LineOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(new LineOutEvent(<Player>state.atBat, this.defensivePlayer));
        return events;
    }
}
