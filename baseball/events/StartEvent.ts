import { EventType } from "../enums";
import { GameEvent } from "./event";

export class StartEvent implements GameEvent {
    type: EventType;
    properties: any;

    constructor () {
        this.type = EventType.Start;
    }
}

export function startEventStringify (event: StartEvent): string {
    return "Game started.";
}