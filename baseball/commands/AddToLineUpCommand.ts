import { GameCommand } from "./command";
import { GameEvent, AddToLineUpEvent } from "../events";
import { GameState } from "../aggregates/gameState";
import { Player } from "../player";
import { Team } from "../enums";

export class AddToLineUpCommand extends GameCommand {
    constructor(protected player: Player, protected spot: number, protected team: Team){
        super();
    }

    do(events: Array<GameEvent>, state: GameState): void {
        if(this.team === Team.home) {
            state.homeLineUp.validateAdd(this.player, this.spot);
        } else {
            state.visitorLineUp.validateAdd(this.player, this.spot);
        }
        events.push(new AddToLineUpEvent(this.player, this.spot, this.team));
    }
};
