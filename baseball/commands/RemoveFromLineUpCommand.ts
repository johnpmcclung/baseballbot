import { GameCommand } from "./command";
import { Player } from "../player";
import { Team } from "../enums";
import { GameEvent, RemoveFromLineUpEvent } from "../events";
import { GameState } from "../aggregates/gameState";

export class RemoveFromLineUpCommand extends GameCommand {
    constructor(protected player: Player, protected team: Team) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState): void {
        events.push(new RemoveFromLineUpEvent(this.player, this.team));
    }
}
