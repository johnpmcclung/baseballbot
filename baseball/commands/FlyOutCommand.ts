import { GameState } from "../aggregates/gameState";
import { FlyOutEvent, GameEvent } from "../events";
import { Player } from "../player";
import { OutCommand } from "./OutCommand";

export class FlyOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(state: GameState) : Array<GameEvent> {
        super.checkAtBatCommand(state);
        let events = super.do(state);
        events.push(new FlyOutEvent(<Player>state.atBat, this.defensivePlayer));
        return events;
    }
}
