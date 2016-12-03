import { EventType } from "../enums";
import { Player } from "../player";
import { HitEvent } from "./HitEvent";

export class HitByPitchEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.HitByPitch;
        this.properties = { "player": player };
    }
}

export function hitByPitchEventStringify(event: HitByPitchEvent) {
    return `${event.properties.player.name} was hit by the pitch. (HBP)`;
}
