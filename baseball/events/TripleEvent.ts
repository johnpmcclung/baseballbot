import { HitEvent } from "./HitEvent";
import { Player } from "../player";
import { EventType } from "../enums";

export class TripleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Triple;
        this.properties = {player: player}; 
    }
}

export function tripleEventStringify(event: TripleEvent) {
    return `${this.player.name} hit a triple. (3B)`;
}
