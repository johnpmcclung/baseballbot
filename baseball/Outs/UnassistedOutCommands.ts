import { GameEvent } from "../event";
import { FlyOutEvent, LineOutEvent, GroundOutEvent } from "./UnassistedOutEvents";
import { GameState } from "../state";
import { GameCommand } from "../command";
import { Player } from "../player";
import { OutCommand } from "../Outs/OutCommand";

export class FlyOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(new FlyOutEvent(state.atBat, this.defensivePlayer));
        return events;
    }
}

export class LineOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(new LineOutEvent(state.atBat, this.defensivePlayer));
        return events;
    }
}

export class GroundOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(new GroundOutEvent(state.atBat, this.defensivePlayer));
        return events;
    }
}
