import { GameEvent } from "./event";
import { Player } from "../player";
import { EventType, OffensivePosition } from "../enums";

export class AdvanceRunnerEvent implements GameEvent {
    type: EventType;
    properties: AdvanceRunnerEventProperties;

    constructor(player: Player, from: OffensivePosition, to: OffensivePosition) {
        this.type = EventType.AdvanceRunner;
        this.properties = {player: player, from: from, to: to}
    }
}

export interface AdvanceRunnerEventProperties {
    player: Player;
    from: OffensivePosition;
    to: OffensivePosition;
}

export function advanceRunnerEventStringify(event: AdvanceRunnerEvent): string {
    return `${event.properties.player.name} went from ${OffensivePosition[event.properties.from].toLocaleLowerCase()} to ` +
        `${OffensivePosition[event.properties.to].toLocaleLowerCase()}.`;
}