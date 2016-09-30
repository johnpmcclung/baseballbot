import { EventType, Team } from "../enums";
import { GameCommand } from "../command";
import { GameEvent } from "../event";
import { GameState } from "../state";
import { Player } from "../player";

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

export class AddToLineUpEvent implements GameEvent {
    type: EventType;
    properties: AddToLineUpEventProperties;

    constructor (player: Player, spot: number, team: Team) {
        this.type = EventType.AddToLineUp;
        this.properties = { player: player, spot: spot, team: team};
    }
}

export interface AddToLineUpEventProperties {
    player: Player;
    spot: number;
    team: Team;
}

export function addToLineUpEventEvolver(event: AddToLineUpEvent, state: GameState): void {
    if(event.properties.team === Team.home) {
        state.homeLineUp.add(event.properties.player, event.properties.spot);
    } else {
        state.visitorLineUp.add(event.properties.player, event.properties.spot);
    }
}