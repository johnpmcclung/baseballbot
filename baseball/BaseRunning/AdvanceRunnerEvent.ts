import * as lodash from "lodash";
import { GameEvent } from "../event";
import { GameState } from "../state";
import { Player } from "../player";
import { EventType, OffensivePosition, InningHalf, DefensivePosition } from "../enums";

export class AdvanceRunnerEvent implements GameEvent {
    type: EventType;
    properties: AdvanceRunnerEventProperties;

    constructor(player: Player, from: OffensivePosition, to: OffensivePosition) {
        this.type = EventType.AdvanceRunner;
        this.properties = {player: player, from: from, to: to}
    }

}

export interface AdvanceRunnerEventProperties {
    player: Player,
    from: OffensivePosition,
    to: OffensivePosition
}

export function advanceRunnerEventEvolver(event: AdvanceRunnerEvent, state: GameState): void {
    switch (event.properties.from) {
        case OffensivePosition.atBat:
            state.atBat = null;
            break;
        case OffensivePosition.first:
            state.firstBase = lodash.without(state.firstBase, event.properties.player);
            break;
        case OffensivePosition.second:
            state.secondBase = lodash.without(state.secondBase, event.properties.player);
            break;
        case OffensivePosition.third:
            state.thirdBase = lodash.without(state.thirdBase, event.properties.player);
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

export function advanceRunnerEventStringify(event: AdvanceRunnerEvent): string {
    return `${event.properties.player.name} went from ${OffensivePosition[event.properties.from].toLocaleLowerCase()} to ` +
        `${OffensivePosition[event.properties.to].toLocaleLowerCase()}.`;
}