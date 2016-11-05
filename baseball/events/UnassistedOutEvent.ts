import { EventType } from "../enums";
import { GameEvent } from "./event";
import { Player } from "../player";

export abstract class UnassistedOutEvent implements GameEvent {
    type: EventType;
    properties: UnassistedOutEventProperties;
}

export interface UnassistedOutEventProperties {
    offensivePlayer: Player;
    defensivePlayer: Player;
}
