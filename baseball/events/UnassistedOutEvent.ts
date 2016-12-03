import { EventType } from "../enums";
import { Player } from "../player";
import { GameEvent } from "./event";

export abstract class UnassistedOutEvent implements GameEvent {
    type: EventType;
    properties: UnassistedOutEventProperties;
}

export interface UnassistedOutEventProperties {
    offensivePlayer: Player;
    defensivePlayer: Player;
}
