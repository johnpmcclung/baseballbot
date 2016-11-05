import { GameState } from "../aggregates/gameState";
import { GameEvent, StrikeOutEvent } from "../events";
import { Player } from "../player";
import { OutCommand } from "./OutCommand";

export class StrikeOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player, private looking: boolean) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(new StrikeOutEvent(<Player>state.atBat, this.defensivePlayer, this.looking));
        return events;
    }
}
