import { GameEvent } from "./event";
import { Player } from "../player";
import { EventType, Team } from "../enums";

export class RemoveFromLineUpEvent implements GameEvent {
    public type: EventType;
    public properties: RemoveFromLineUpEventProperties;

    constructor(player: Player, team: Team) {
        this.type = EventType.RemoveFromLineUp;
        this.properties = {
            player: player,
            team: team
        };
    }
}

export interface RemoveFromLineUpEventProperties {
    player: Player;
    team: Team;
}
