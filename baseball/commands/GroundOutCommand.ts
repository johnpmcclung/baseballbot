import { GameCommand } from "./command";
import { GameState } from "../aggregates/gameState";
import { GameEvent, GroundOutEvent } from "../events";
import { Player } from "../player";
import { OutCommand } from "./OutCommand";

export class GroundOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(new GroundOutEvent(<Player>state.atBat, this.defensivePlayer));
        return events;
    }
}
