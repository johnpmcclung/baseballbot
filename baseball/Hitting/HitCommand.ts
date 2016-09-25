import { AdvanceRunnerCommand } from "../BaseRunning/AdvanceRunnerCommand";
import { GameState } from "../state";
import { GameEvent } from "../event";
import { Player } from "../player";
import { SingleEvent, DoubleEvent,
    TripleEvent, HomerunEvent, HitEvent } from  "./HitEvent";
import { OffensivePosition, DefensivePosition } from "../enums";

export class HitCommand extends AdvanceRunnerCommand {
    constructor(player: Player | null, to: OffensivePosition, protected eventFunc: (player: Player) => HitEvent) {
        super(to, player);
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkAtBatCommand(state);
        super.do(events, state);

        if(!this.player) { throw new Error("No player found.")}
        events.push(this.eventFunc(<Player>this.player));
    }
}

export class SingleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.first, (player: Player) => new SingleEvent(player));
    }
}

export class DoubleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.second, (player: Player) => new DoubleEvent(player));
    }
}

export class TripleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.third, (player: Player) => new TripleEvent(player));
    }
}

export class HomerunCommand extends HitCommand {
    constructor (player: Player | null) {
        super(player, OffensivePosition.home, (player: Player) => new HomerunEvent(player));
    }
}
