import { GameEvent } from "../event";
import { GameState } from "../state";
import { EventType } from "../enums";
import { Player } from "../player";

export class BatterUpEvent implements GameEvent {
    type: EventType;
    properties: BatterUpEventProperties;

    constructor(player: Player) {
        this.type = EventType.BatterUp;
        this.properties = { player: player };
    }
}

export interface BatterUpEventProperties {
    player: Player;
}

export function batterUpEventEvolver(event: BatterUpEvent, state: GameState): void {
    state.atBat = event.properties.player;
}

export function batterUpEventStringify(event: BatterUpEvent) {
        return "A batter comes to the plate.";
}
