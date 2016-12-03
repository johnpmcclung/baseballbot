import { EventType } from "../enums";
import { Player } from "../player";
import { UnassistedOutEvent } from "./UnassistedOutEvent";

export class LineOutEvent extends UnassistedOutEvent {
    constructor(offensivePlayer: Player, defensivePlayer: Player) {
        super();
        this.type = EventType.LineOut;
        this.properties = {
            "offensivePlayer": offensivePlayer,
            "defensivePlayer": defensivePlayer
        };
    }
}

export function lineOutEventStringify(event: LineOutEvent): string {
    return `${event.properties.offensivePlayer.name} hit a line drive to ` +
        `${event.properties.defensivePlayer.name}. (L${event.properties.defensivePlayer.position})`;
}
