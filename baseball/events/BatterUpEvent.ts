import { EventType } from "../enums";
import { GameEvent } from "../events";

export class BatterUpEvent implements GameEvent {
    type: EventType;
    properties: any;

    constructor() {
        this.type = EventType.BatterUp;
        this.properties = { };
    }
}

export function batterUpEventStringify(event: BatterUpEvent) {
        return "A batter comes to the plate.";
}
