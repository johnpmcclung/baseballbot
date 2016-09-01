import { GameCommand } from "../command";
import { GameEvent } from "../event";
import { GameState } from "../state";
import { Player } from "../player";
import { OffensivePosition, Team, InningHalf } from "../enums";
import { AdvanceRunnerEvent } from "./AdvanceRunnerEvent";
import { RunScoredEvent } from "../Scoring/RunScoredEvent";

export class AdvanceRunnerCommand extends GameCommand {
    constructor(protected to: OffensivePosition, protected player: Player) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState) {
        super.checkInGameCommand(state);
        if (this.player === null) {
            this.player = state.atBat;
        }
        var from = this.findPlayer(this.player, state);
        if (from > this.to) { throw new Error("Runner are not allowed to move backwards."); }
        events.push(new AdvanceRunnerEvent(this.player, from, this.to));

        if (this.to !== OffensivePosition.home) { return; }

        if (state.inningHalf === InningHalf.top) {
            events.push(new RunScoredEvent(Team.visitor));
        }
        if (state.inningHalf === InningHalf.bottom) {
            events.push(new RunScoredEvent(Team.home));
        }
    }

    private findPlayer(player: Player, state: GameState) : OffensivePosition {
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
    }
}
