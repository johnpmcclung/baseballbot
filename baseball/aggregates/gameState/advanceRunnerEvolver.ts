import * as _ from "lodash";
import { OffensivePosition } from "../../enums";
import { AdvanceRunnerEvent } from "../../events/AdvanceRunnerEvent";
import { GameState } from "./state";

export function advanceRunnerEvolver(event: AdvanceRunnerEvent, state: GameState): void {
    switch (event.properties.from) {
        case OffensivePosition.atBat:
            state.atBat = null;
            break;
        case OffensivePosition.first:
            state.firstBase = _.without(state.firstBase, event.properties.player);
            break;
        case OffensivePosition.second:
            state.secondBase = _.without(state.secondBase, event.properties.player);
            break;
        case OffensivePosition.third:
            state.thirdBase = _.without(state.thirdBase, event.properties.player);
            break;
    }

    switch (event.properties.to) {
        case OffensivePosition.first:
            state.firstBase.push(event.properties.player);
            break;
        case OffensivePosition.second:
            state.secondBase.push(event.properties.player);
            break;
        case OffensivePosition.third:
            state.thirdBase.push(event.properties.player);
            break;
    }
}
