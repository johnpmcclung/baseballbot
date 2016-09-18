import { EventType } from "../enums";
import { GameCommand } from "../command";
import { GameEvent } from "../event";
import { GameState } from "../state";
import { Player } from "../player";

export class AddToLineUpCommand extends GameCommand {
    constructor(){
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        events.push(new AddToLineUpEvent());
    }
};

export class AddToLineUpEvent implements GameEvent {
    type: EventType;
    properties: any;

    constructor () {
        this.type = EventType.AddToLineUp;
    }
}