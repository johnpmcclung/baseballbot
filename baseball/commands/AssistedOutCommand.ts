import { GameState } from "../aggregates/gameState";
import { AssistedOutEvent, GameEvent } from "../events";
import { Player } from "../player";
import { OutCommand } from "./OutCommand";

export class AssistedOutCommand extends OutCommand {
    constructor(private defensivePlayers: Player[], private outPlayers: Player[]) { super(); }

    do(state: GameState):  Array<GameEvent> {
        if (this.defensivePlayers.length <= 1) {
            throw new Error("An assisted out requires two defensive players.");
        }
        if (this.outPlayers.length <= 0) {
            throw new Error("An assisted out requires at least one player who is out to be supplied.");
        }
        this.checkAtBatCommand(state);
        let events: Array<GameEvent> = [];
        events.push(new AssistedOutEvent(this.defensivePlayers, this.outPlayers));
        this.outPlayers.forEach(player => {
            events = events.concat(super.do(state));
        });
        return events;
    }
}
