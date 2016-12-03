import { EventType } from "../enums";
import { Player } from "../player";
import { HitEvent } from "./HitEvent";

export class HomerunEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Homerun;
        this.properties = { "player": player };
    }
}

export function homerunEventStringify(event: HomerunEvent) {
    return `${event.properties.player.name} hit a homerun. (HR)`;
}
