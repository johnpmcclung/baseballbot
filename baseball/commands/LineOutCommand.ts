import { GameState } from "../aggregates/gameState";
import { LineOutEvent } from "../events";
import { Player } from "../player";
import { OutCommand } from "./OutCommand";

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
