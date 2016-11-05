import * as _ from "lodash";
import { GameState } from "./state";
import { AssistedOutEvent } from "../../events";

export function assistedOutEvolver (event: AssistedOutEvent, state: GameState): void {
    event.properties.outPlayers.forEach(player => {
        state.firstBase = _.without(state.firstBase, player);
        state.secondBase = _.without(state.secondBase, player);
        state.thirdBase = _.without(state.thirdBase, player);
        if (state.atBat === player) {
            state.atBat = null;
        }
    });
}
