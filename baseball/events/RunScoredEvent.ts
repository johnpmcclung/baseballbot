import { EventType, Team } from "../enums";
import { GameEvent } from "./event";

export class RunScoredEvent implements GameEvent {
    type: EventType;
    properties: RunScoredEventProperties;

    constructor (team: Team) {
        this.type = EventType.RunScored;
        this.properties = { "team": team };
    }
}

export interface RunScoredEventProperties {
    team: Team;
}

export function runScoredEventStringify (event: RunScoredEvent): string {
    return `The ${Team[event.properties.team].toLocaleString()} team has scored a run.`;
}