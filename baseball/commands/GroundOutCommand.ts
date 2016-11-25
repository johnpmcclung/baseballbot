import { GameState } from "../aggregates/gameState";
import { GameEvent, GroundOutEvent } from "../events";
import { Player } from "../player";
import { OutCommand } from "./OutCommand";

export class GroundOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(state: GameState): Array<GameEvent> {
        super.checkAtBatCommand(state);
        let events = super.do(state);
        events.push(new GroundOutEvent(<Player>state.atBat, this.defensivePlayer));
        return events;
    }
}
