import { EventType } from "../enums";
import { GameEvent } from "./event";

export class OutEvent implements GameEvent {
    type: EventType;
    properties: OutEventProperties;

    constructor(outs: number) {
        this.type = EventType.Out;
        this.properties = { outs: outs };
    }
}

export interface OutEventProperties {
    outs: number;
}

export function outEventStringify (event: OutEvent): string {
    return `There are ${event.properties.outs} outs.`;
}