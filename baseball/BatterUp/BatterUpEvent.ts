import { GameEvent } from "../event";
import { GameState } from "../state";
import { EventType, InningHalf } from "../enums";
import { Player } from "../player";

export class BatterUpEvent implements GameEvent {
    type: EventType;
    properties: any;

    constructor() {
        this.type = EventType.BatterUp;
        this.properties = { };
    }
}

export function batterUpEventEvolver(event: BatterUpEvent, state: GameState): void {
    if(state.inningHalf === InningHalf.top) {
        state.visitorLineUp.nextBatter();
        state.atBat = state.visitorLineUp.getBatter(); 
    } else if (state.inningHalf === InningHalf.bottom){
        state.homeLineUp.nextBatter();
        state.atBat = state.homeLineUp.getBatter(); 
    }
}

export function batterUpEventStringify(event: BatterUpEvent) {
        return "A batter comes to the plate.";
}
