import { GameCommand } from "./command";
import { GameEvent, AdvanceRunnerEvent, RunScoredEvent } from "../events";
import { GameState } from "../aggregates/gameState";
import { Player } from "../player";
import { OffensivePosition, Team, InningHalf } from "../enums";

export class AdvanceRunnerCommand extends GameCommand {
    constructor(protected to: OffensivePosition, protected player: Player | null) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState): void {
        super.checkInGameCommand(state);

        var from: OffensivePosition | null;
        if(!this.player) {
            this.player = state.atBat;
            from = OffensivePosition.atBat;
        } else {
            from = this.findPlayer(<Player>this.player, state);
        }

        if (from === null) { throw new Error("Runner not found."); }
        if (from > this.to) { throw new Error("Runner are not allowed to move backwards."); }
        events.push(new AdvanceRunnerEvent(<Player>this.player, <OffensivePosition>from, this.to));

        if (this.to !== OffensivePosition.home) { return; }

        if (state.inningHalf === InningHalf.top) {
            events.push(new RunScoredEvent(Team.visitor));
        }
        if (state.inningHalf === InningHalf.bottom) {
            events.push(new RunScoredEvent(Team.home));
        }
    }

    private findPlayer(player: Player, state: GameState): OffensivePosition | null {
        if (state.atBat === player) {
            return OffensivePosition.atBat;
        }
        if (state.firstBase.indexOf(player) !== -1) {
            return OffensivePosition.first;
        }
        if (state.secondBase.indexOf(player) !== -1) {
            return OffensivePosition.second;
        }
        if (state.thirdBase.indexOf(player) !== -1) {
            return OffensivePosition.third;
        }
        return null;
    }
}
