import { HitEvent } from "./HitEvent";
import { Player } from "../player";
import { EventType } from "../enums";

export class FieldersChoiceEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.FieldersChoice;
        this.properties = {player: player}; 
    }
}

export function fieldersChoiceEventStringify(event: FieldersChoiceEvent) {
    return `${event.properties.player.name} arrived at first on fielder's choice. (FC)`;
}
