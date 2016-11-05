import { EventType } from "../enums";

export interface GameEvent {
    type: EventType;
    properties: any;
}