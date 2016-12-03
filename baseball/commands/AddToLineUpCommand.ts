import { GameState } from "../aggregates/gameState";
import { Team } from "../enums";
import { AddToLineUpEvent, GameEvent } from "../events";
import { Player } from "../player";
import { GameCommand } from "./command";

export class AddToLineUpCommand extends GameCommand {
    constructor(protected player: Player, protected spot: number, protected team: Team){
        super();
    }

    do(state: GameState): Array<GameEvent> {
        if(this.team === Team.home) {
            state.homeLineUp.validateAdd(this.player, this.spot);
        } else {
            state.visitorLineUp.validateAdd(this.player, this.spot);
        }
        return [new AddToLineUpEvent(this.player, this.spot, this.team)];
    }
};
