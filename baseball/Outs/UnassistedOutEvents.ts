import { EventType } from "../enums";
import { GameState } from "../state";
import { GameEvent } from "../event";
import { Player } from "../player";

export abstract class UnassistedOutEvent implements GameEvent {
    type: EventType;
    properties: UnassistedOutEventProperties;
}

export interface UnassistedOutEventProperties {
    offensivePlayer: Player;
    defensivePlayer: Player;
}

export function unassistedOutEventEvolver (event: UnassistedOutEvent, state: GameState): void {
    state.atBat = null;
}

export class FlyOutEvent extends UnassistedOutEvent {
    constructor(offensivePlayer: Player, defensivePlayer: Player) {
        super();
        this.type = EventType.FlyOut;
        this.properties = { offensivePlayer: offensivePlayer, defensivePlayer: defensivePlayer };
    }
}

export function flyOutEventStringify(event: FlyOutEvent): string {
    return `${event.properties.offensivePlayer.name} hit a fly ball to` +
        ` ${event.properties.defensivePlayer.name}. (F${event.properties.defensivePlayer.position})`;
}

export class LineOutEvent extends UnassistedOutEvent {
    constructor(offensivePlayer: Player, defensivePlayer: Player) {
        super();
        this.type = EventType.LineOut;
        this.properties = { offensivePlayer: offensivePlayer, defensivePlayer: defensivePlayer };
    }
}

export function lineOutEventStringify(event: LineOutEvent): string {
    return `${event.properties.offensivePlayer.name} hit a line drive to ` +
        `${event.properties.defensivePlayer.name}. (L${event.properties.defensivePlayer.position})`;
}

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

export class StrikeOutEvent implements GameEvent {
    constructor(offensivePlayer: Player, defensivePlayer: Player, looking: boolean) {
        this.type = EventType.StrikeOut;
        this.properties = { offensivePlayer: offensivePlayer, defensivePlayer: defensivePlayer, looking: looking };
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
