import { AdvanceRunnerCommand } from "../BaseRunning/AdvanceRunnerCommand";
import { GameState } from "../state";
import { GameEvent } from "../event";
import { Player } from "../player";
import { SingleEvent, DoubleEvent,
    TripleEvent, HomerunEvent, HitEvent } from  "./HitEvent";
import { OffensivePosition, DefensivePosition } from "../enums";

export class HitCommand extends AdvanceRunnerCommand {
    constructor(to: OffensivePosition, protected event: HitEvent) {
        super(to, null);
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);
        events.push(this.event);
    }
}

export class SingleCommand extends HitCommand {
    constructor(player: Player) {
        super(OffensivePosition.first, new SingleEvent(player));
    }
}

export class DoubleCommand extends HitCommand {
    constructor(player: Player) {
        super(OffensivePosition.second, new DoubleEvent(player));
    }
}

export class TripleCommand extends HitCommand {
    constructor(player: Player) {
        super(OffensivePosition.third, new TripleEvent(player));
    }
}

export class HomerunCommand extends HitCommand {
    constructor (player: Player) {
        super(OffensivePosition.home, new HomerunEvent(player));
    }
}
