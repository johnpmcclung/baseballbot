import { GameState } from "../state";
import { GameEvent } from "../event";
import { EventType } from "../enums";
import { Player } from "../player";

export abstract class HitEvent implements GameEvent {
    type: EventType;
    properties: HitEventProperties;
}

export interface HitEventProperties {
    player: Player;
}

export class SingleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Single;
        this.properties = {player: player}; 
    }
}

export function singleEventStringify(event: SingleEvent) {
    return `${event.properties.player.name} hit a single. (1B)`;
}

export class DoubleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Double;
        this.properties = {player: player}; 
    }
}

export function doubleEventStringify(event: DoubleEvent) {
    return `${event.properties.player.name} hit a double. (2B)`;
}

export class TripleEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Triple;
        this.properties = {player: player}; 
    }
}

export function tripleEventStringify(event: TripleEvent) {
    return `${this.player.name} hit a triple. (3B)`;
}

export class HomerunEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.Homerun;
        this.properties = {player: player}; 
    }
}

export function homerunEventStringify(event: HomerunEvent) {
    return `${event.properties.player.name} hit a homerun. (HR)`;
}

export interface WalkEventProperties {
    player: Player;
    intentional: boolean;
}

export class WalkEvent {
    constructor(player: Player, intentional: boolean) {
        this.type = EventType.Walk;
        this.properties = {player: player, intentional: intentional};
    }
    type: EventType;
    properties: WalkEventProperties;
}

export function walkEventStringify(event: SingleEvent) {
    return `${event.properties.player.name} walked. (${this.properties.intentional ? 'IBB' : 'BB'})`;
}

export class HitByPitchEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.HitByPitch;
        this.properties = {player: player}; 
    }
}

export function hitByPitchEventStringify(event: SingleEvent) {
    return `${event.properties.player.name} was hit by the pitch. (HBP)`;
}

export class FieldersChoiceEvent extends HitEvent {
    constructor(player: Player) {
        super();
        this.type = EventType.FieldersChoice;
        this.properties = {player: player}; 
    }
}

export function fieldersChoiceEventStringify(event: SingleEvent) {
    return `${event.properties.player.name} arrived at first on fielder's choice. (FC)`;
}
