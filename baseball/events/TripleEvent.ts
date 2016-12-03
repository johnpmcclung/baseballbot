import { EventType } from "../enums";
import { Player } from "../player";
import { HitEvent } from "./HitEvent";

export class TripleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Triple;
        this.properties = { "player": player };
    }
}

export function tripleEventStringify(event: TripleEvent) {
    return `${this.player.name} hit a triple. (3B)`;
}
