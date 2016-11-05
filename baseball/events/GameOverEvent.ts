import { EventType, Team } from "../enums";
import { GameEvent } from "./event";

export class GameOverEvent implements GameEvent {
    type: EventType;
    properties: GameOverEventProperties;

    constructor (winner: Team) {
        this.type = EventType.GameOver;
        this.properties = { winner: winner };
    }
}

export interface GameOverEventProperties {
    winner: Team;
}

export function gameOverEventStringify(event: GameOverEvent): string {
    return `The ${Team[event.properties.winner].toLocaleString()} team has won the game.`;
}