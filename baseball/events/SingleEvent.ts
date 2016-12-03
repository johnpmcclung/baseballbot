import { EventType } from "../enums";
import { Player } from "../player";
import { HitEvent } from "./HitEvent";

export class SingleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Single;
        this.properties = { "player": player };
    }
}

export function singleEventStringify(event: SingleEvent) {
    return `${event.properties.player.name} hit a single. (1B)`;
}
