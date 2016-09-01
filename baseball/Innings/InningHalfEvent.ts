import { EventType, InningHalf } from "../enums";
import { GameState } from "../state";
import { GameEvent } from "../event";

export class InningHalfEvent implements GameEvent {
    type: EventType;
    properties: InningHalfEventProperties;

    constructor(inningHalf: InningHalf) {
        this.type = EventType.InningHalf;
        this.properties =  { inningHalf: inningHalf }
    }
}

export interface InningHalfEventProperties {
    inningHalf: InningHalf
}

export function inningHalfEventEvolver(event: InningHalfEvent, state: GameState): void {
    state.inningHalf = event.properties.inningHalf;
}

export function inningHalfEventStringify(event: InningHalfEvent): string {
    return `The ${InningHalf[event.properties.inningHalf].toLocaleString()} of the inning has begun.`;
}