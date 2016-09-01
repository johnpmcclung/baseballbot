import * as lodash from "lodash";
import { OutCommand } from "./OutCommand";
import { Player } from "../player";
import { GameEvent } from "../event";
import { GameState } from "../state";
import { EventType } from "../enums";

export class AssistedOutCommand extends OutCommand {
    constructor(private defensivePlayers: Player[], private outPlayers: Player[]) { super(); }

    do(events: GameEvent[], state: GameState): void {
        if (this.defensivePlayers.length <= 1) {
            throw new Error("An assisted out requires two defensive players.");
        }
        if (this.outPlayers.length <= 0) {
            throw new Error("An assisted out requires at least one player who is out to be supplied.");
        }
        this.checkAtBatCommand(state);
        events.push(new AssistedOutEvent(this.defensivePlayers, this.outPlayers));
        this.outPlayers.forEach(player => {
            super.do(events, state);
        });
    }
}

export class AssistedOutEvent implements GameEvent {
    type: EventType;
    properties: AssistedOutEventProperties;

    constructor (defensivePlayers: Player[], outPlayers: Player[]) {
        this.type = EventType.AssistedOut;
        this.properties = { defensivePlayers: defensivePlayers, outPlayers: outPlayers };
    }
}

export interface AssistedOutEventProperties {
    defensivePlayers: Player[];
    outPlayers: Player[];
}

export function assistedOutEventEvolver (event: AssistedOutEvent, state: GameState): void {
    event.properties.outPlayers.forEach(player => {
        state.firstBase = lodash.without(state.firstBase, player);
        state.secondBase = lodash.without(state.secondBase, player);
        state.thirdBase = lodash.without(state.thirdBase, player);
        if (state.atBat === player) {
            state.atBat = null;
        }
    });
}

export function assistedOutEventStringify(event: AssistedOutEvent): string {
    var outs: string;
    var play = "(";

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