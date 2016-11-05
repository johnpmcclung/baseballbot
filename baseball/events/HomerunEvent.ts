import { HitEvent } from "./HitEvent";
import { Player } from "../player";
import { EventType } from "../enums";

export class HomerunEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Homerun;
        this.properties = {player: player}; 
    }
}

export function homerunEventStringify(event: HomerunEvent) {
    return `${event.properties.player.name} hit a homerun. (HR)`;
}
