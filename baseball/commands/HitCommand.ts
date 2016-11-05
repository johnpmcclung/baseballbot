import { AdvanceRunnerCommand } from "./AdvanceRunnerCommand";
import { GameState } from "../aggregates/gameState";
import { GameEvent } from "../events";
import { Player } from "../player";
import { HitEvent } from "../events";
import { OffensivePosition } from "../enums";

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
