import { EventType } from "../enums";
import { Player } from "../player";
import { UnassistedOutEvent } from "./UnassistedOutEvent";

export class FlyOutEvent extends UnassistedOutEvent {
    constructor(offensivePlayer: Player, defensivePlayer: Player) {
        super();
        this.type = EventType.FlyOut;
        this.properties = {
            "offensivePlayer": offensivePlayer,
            "defensivePlayer": defensivePlayer
        };
    }
}

export function flyOutEventStringify(event: FlyOutEvent): string {
    return `${event.properties.offensivePlayer.name} hit a fly ball to` +
        ` ${event.properties.defensivePlayer.name}. (F${event.properties.defensivePlayer.position})`;
}
