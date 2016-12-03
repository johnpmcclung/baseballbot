import { EventType } from "../enums";
import { Player } from "../player";
import { GameEvent } from "./event";

export class StrikeOutEvent implements GameEvent {
    constructor(offensivePlayer: Player, defensivePlayer: Player, looking: boolean) {
        this.type = EventType.StrikeOut;
        this.properties = {
            "offensivePlayer": offensivePlayer,
            "defensivePlayer": defensivePlayer,
            "looking": looking
        };
    }
    type: EventType;
    properties: StrikeOutEventProperties;
}

export interface StrikeOutEventProperties {
    offensivePlayer: Player;
    defensivePlayer: Player;
    looking: boolean;
}

export function strikeOutEventStringify(event: StrikeOutEvent): string {
    return `${event.properties.offensivePlayer.name} went down on strikes to` +
        `${event.properties.defensivePlayer.name}. (${event.properties.looking ?"ꓘ":"K"})`;
}
