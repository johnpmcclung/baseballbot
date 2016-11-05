import { OutCommand } from "./OutCommand";
import { Player } from "../player";
import { GameEvent, AssistedOutEvent } from "../events";
import { GameState } from "../aggregates/gameState";
import { EventType } from "../enums";

export class AssistedOutCommand extends OutCommand {
    constructor(private defensivePlayers: Player[], private outPlayers: Player[]) { super(); }

    do(events: GameEvent[], state: GameState): void {
        if (this.defensivePlayers.length <= 1) {
            throw new Error("An assisted out requires two defensive players.");
        }
        if (this.outPlayers.length <= 0) {
            throw new Error("An assisted out requires at least one player who is out to be supplied.");
        }
        this.checkAtBatCommand(state);
        events.push(new AssistedOutEvent(this.defensivePlayers, this.outPlayers));
        this.outPlayers.forEach(player => {
            super.do(events, state);
        });
    }
}
