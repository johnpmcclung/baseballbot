import { EventType, Team } from "../enums";
import { Player } from "../player";
import { GameEvent } from "./event";

export class AddToLineUpEvent implements GameEvent {
    type: EventType;
    properties: AddToLineUpEventProperties;

    constructor (player: Player, spot: number, team: Team) {
        this.type = EventType.AddToLineUp;
        this.properties = {
            "player": player,
            "spot": spot,
            "team": team
        };
    }
}

export interface AddToLineUpEventProperties {
    player: Player;
    spot: number;
    team: Team;
}
