import { EventType, Team } from "../enums";
import { GameState } from "../state";
import { GameEvent } from "../event";

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

export function gameOverEventEvolver (event: GameEvent, state: GameState): void {
    state.gameOver = true;
    state.winner = event.properties.winner;
}

export function gameOverEventStringify(event: GameOverEvent): string {
    return `The ${Team[event.properties.winner].toLocaleString()} team has won the game.`;
}