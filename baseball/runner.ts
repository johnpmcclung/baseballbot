/// <reference path="../typings/index.d.ts" />

import * as lodash from "lodash";
import { GameEvent, evolve } from "./event";
import { GameCommand } from "./command";
import { GameState } from "./state";

export class Runner {
    private eventIndex: number = 0;

    state: GameState;
    events: Array<GameEvent>;

    constructor(events?: Array<GameEvent>) {
        if (events) {
            this.state = new GameState();
            this.events = events;
            this.evolveState();
        } else {
            this.state = new GameState();
            this.events = [];
        }
    }

    do(command: GameCommand) {
        command.do(this.events, this.state);
        this.evolveState();
    }

    private evolveState() {
        this.events.slice(this.eventIndex)
            .forEach((event) => evolve(event, this.state));
        this.eventIndex = this.events.length;
    }
}