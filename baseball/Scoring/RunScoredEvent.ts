import { EventType, Team } from "../enums";
import { GameState } from "../state";
import { GameEvent } from "../event";

export class RunScoredEvent implements GameEvent {
    type: EventType;
    properties: RunScoredEventProperties;

    constructor (team: Team) {
        this.type = EventType.RunScored;
        this.properties = {team: team};
    }
}

export interface RunScoredEventProperties {
    team: Team;
}

export function runScoredEventEvolver (event: RunScoredEvent, state: GameState): void {
    if (event.properties.team === Team.home) { state.homeScore += 1; }
    if (event.properties.team === Team.visitor) { state.visitorScore += 1; }
}

export function runScoredEventStringify (event: RunScoredEvent): string {
    return `The ${Team[event.properties.team].toLocaleString()} team has scored a run.`;
}