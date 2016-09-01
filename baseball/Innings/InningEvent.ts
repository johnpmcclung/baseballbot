import { EventType } from "../enums";
import { GameState } from "../state";
import { GameEvent } from "../event";

export class InningEvent implements GameEvent {
    type: EventType;
    properties: InningEventProperties;

    constructor(inningNumber: number) {
        this.type = EventType.Inning;
        this.properties = { inningNumber: inningNumber };
    }
}

export interface InningEventProperties {
    inningNumber: number;
}

export function inningEventEvolver(event: InningEvent, state: GameState) : void {
    state.inning = event.properties.inningNumber;
}

export function inningEventStringify(event: InningEvent): string {
    return `Inning number ${event.properties.inningNumber} has begun.`;
}