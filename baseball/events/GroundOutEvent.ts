import { UnassistedOutEvent } from "./UnassistedOutEvent";
import { Player } from "../player";
import { EventType } from "../enums";

export class GroundOutEvent extends UnassistedOutEvent {
    constructor(offensivePlayer: Player, defensivePlayer: Player) {
        super();
        this.type = EventType.GroundOut;
        this.properties = { offensivePlayer: offensivePlayer, defensivePlayer: defensivePlayer };
    }
}

export function groundOutEventStringify(event: GroundOutEvent): string {
    return `${event.properties.offensivePlayer.name} hit a ground out to ` +
        `${event.properties.defensivePlayer.name}. (L${event.properties.defensivePlayer.position})`;
}
