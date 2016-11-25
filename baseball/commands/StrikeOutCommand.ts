import { GameState } from "../aggregates/gameState";
import { GameEvent, StrikeOutEvent } from "../events";
import { Player } from "../player";
import { OutCommand } from "./OutCommand";

export class StrikeOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player, private looking: boolean) {
        super();
    }

    do(state: GameState): Array<GameEvent> {
        super.checkAtBatCommand(state);
        let events = super.do(state);
        events.push(new StrikeOutEvent(<Player>state.atBat, this.defensivePlayer, this.looking));
        return events;
    }
}
