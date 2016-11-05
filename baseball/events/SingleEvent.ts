import { HitEvent } from "./HitEvent";
import { Player } from "../player";
import { EventType } from "../enums";

export class SingleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Single;
        this.properties = {player: player}; 
    }
}

export function singleEventStringify(event: SingleEvent) {
    return `${event.properties.player.name} hit a single. (1B)`;
}
