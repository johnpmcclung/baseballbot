import { HitEvent } from "./HitEvent";
import { Player } from "../player";
import { EventType } from "../enums";

export class WalkEvent {
    constructor(player: Player, intentional: boolean) {
        this.type = EventType.Walk;
        this.properties = {player: player, intentional: intentional};
    }
    type: EventType;
    properties: WalkEventProperties;
}

export interface WalkEventProperties {
    player: Player;
    intentional: boolean;
}

export function walkEventStringify(event: WalkEvent) {
    return `${event.properties.player.name} walked. (${this.properties.intentional ? 'IBB' : 'BB'})`;
}
