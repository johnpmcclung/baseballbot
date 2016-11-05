import { GameEvent } from "../event";
import { FlyOutEvent, LineOutEvent, GroundOutEvent, StrikeOutEvent } from "./UnassistedOutEvents";
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
        events.push(new FlyOutEvent(<Player>state.atBat, this.defensivePlayer));
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
        events.push(new LineOutEvent(<Player>state.atBat, this.defensivePlayer));
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
        events.push(new GroundOutEvent(<Player>state.atBat, this.defensivePlayer));
        return events;
    }
}

export class StrikeOutCommand extends OutCommand {
    constructor(private defensivePlayer: Player, private looking: boolean) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(new StrikeOutEvent(<Player>state.atBat, this.defensivePlayer, this.looking));
        return events;
    }
}
