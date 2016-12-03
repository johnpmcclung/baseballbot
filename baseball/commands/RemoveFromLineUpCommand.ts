import { GameState } from "../aggregates/gameState";
import { Team } from "../enums";
import { GameEvent, RemoveFromLineUpEvent } from "../events";
import { Player } from "../player";
import { GameCommand } from "./command";

export class RemoveFromLineUpCommand extends GameCommand {
    constructor(protected player: Player, protected team: Team) {
        super();
    }

    do(state: GameState): Array<GameEvent> {
        return [new RemoveFromLineUpEvent(this.player, this.team)];
    }
}
