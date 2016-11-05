import { GameCommand } from "./command";
import { GameState } from "../aggregates/gameState";
import { GameEvent, FlyOutEvent } from "../events";
import { Player } from "../player";
import { OutCommand } from "./OutCommand";

export class FlyOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(new FlyOutEvent(<Player>state.atBat, this.defensivePlayer));
        return events;
    }
}
