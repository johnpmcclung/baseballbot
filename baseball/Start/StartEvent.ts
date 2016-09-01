import { EventType } from "../enums";
import { GameState } from "../state";
import { GameEvent } from "../event";

export class StartEvent implements GameEvent {
    type: EventType;
    properties: any;

    constructor () {
        this.type = EventType.Start;
    }
}

export function startEventEvolver (event: StartEvent, state: GameState): void {
    state.started = true;
}

export function startEventStringify (event: StartEvent): string {
    return "Game started.";
}