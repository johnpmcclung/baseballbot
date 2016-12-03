import { EventType, Team } from "../enums";
import { Player } from "../player";
import { GameEvent } from "./event";

export class RemoveFromLineUpEvent implements GameEvent {
    public type: EventType;
    public properties: RemoveFromLineUpEventProperties;

    constructor(player: Player, team: Team) {
        this.type = EventType.RemoveFromLineUp;
        this.properties = {
            "player": player,
            "team": team
        };
    }
}

export interface RemoveFromLineUpEventProperties {
    player: Player;
    team: Team;
}
