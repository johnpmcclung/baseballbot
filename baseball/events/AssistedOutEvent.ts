import { EventType } from "../enums";
import { Player } from "../player";
import { GameEvent } from "./event";

export class AssistedOutEvent implements GameEvent {
    type: EventType;
    properties: AssistedOutEventProperties;

    constructor (defensivePlayers: Player[], outPlayers: Player[]) {
        this.type = EventType.AssistedOut;
        this.properties = {
            "defensivePlayers": defensivePlayers,
            "outPlayers": outPlayers
        };
    }
}

export interface AssistedOutEventProperties {
    defensivePlayers: Player[];
    outPlayers: Player[];
}

export function assistedOutEventStringify(event: AssistedOutEvent): string {
    let outs: string = "";
    let play = "(";

    if (event.properties.outPlayers.length === 1) {
        outs = `${event.properties.outPlayers[0].name} is out. `;
    }
    if (event.properties.outPlayers.length === 2) {
        outs = `${event.properties.outPlayers[0].name} and ${event.properties.outPlayers[1].name} are out. `;
    }
    if (event.properties.outPlayers.length === 3) {
        outs = `${event.properties.outPlayers[0].name}, ${event.properties.outPlayers[1].name}, and ${event.properties.outPlayers[2].name} are out. `;
    }

    event.properties.defensivePlayers.forEach((player, index) => {
        play = play + player.position;
        if (index === event.properties.defensivePlayers.length - 1) {
            play = play + ")";
        } else {
            play = play + "-";
        }
    });

    return outs + play;
}
