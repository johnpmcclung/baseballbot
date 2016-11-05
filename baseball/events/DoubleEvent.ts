import { HitEvent } from "./HitEvent";
import { Player } from "../player";
import { EventType } from "../enums";

export class DoubleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Double;
        this.properties = {player: player}; 
    }
}

export function doubleEventStringify(event: DoubleEvent) {
    return `${event.properties.player.name} hit a double. (2B)`;
}
