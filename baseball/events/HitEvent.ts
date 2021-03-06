import { EventType } from "../enums";
import { GameEvent } from "../events";
import { Player } from "../player";

export abstract class HitEvent implements GameEvent {
    type: EventType;
    properties: HitEventProperties;
}

export interface HitEventProperties {
    player: Player;
}
