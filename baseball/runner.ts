import { GameEvent } from "./events";
import { GameCommand } from "./commands";
import { GameState, evolve } from "./aggregates/gameState";

export class Runner {
    state: GameState;
    events: Array<GameEvent>;

    constructor(events?: Array<GameEvent> | undefined) {
        if (events) {
            this.state = new GameState();
            this.events = events;
            this.evolveState(events);
        } else {
            this.state = new GameState();
            this.events = [];
        }
    }

    do(command: GameCommand) {
        let newEvents = command.do(this.state);
        this.evolveState(newEvents);
        this.events = this.events.concat(newEvents);
    }

    private evolveState(events: Array<GameEvent>) {
        events.forEach((event) => evolve(event, this.state));
    }
}
