import { EventType } from "../enums";
import { Player } from "../player";
import { HitEvent } from "./HitEvent";

export class DoubleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Double;
        this.properties = {"player": player};
    }
}

export function doubleEventStringify(event: DoubleEvent) {
    return `${event.properties.player.name} hit a double. (2B)`;
}
