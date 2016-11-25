import { GameEvent, LineOutEvent } from "../events";
import { GameState } from "../aggregates/gameState";
import { OutCommand } from "./OutCommand";
import { Player } from "../player";

export class LineOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(state: GameState) {
        super.checkAtBatCommand(state);
        let events = super.do(state);
        events.push(new LineOutEvent(<Player>state.atBat, this.defensivePlayer));
        return events;
    }
}
