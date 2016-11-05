import { BatterUpEvent } from "../../events";
import { GameState } from "./state";
import { InningHalf } from "../../enums";

export function batterUpEvolver(event: BatterUpEvent, state: GameState): void {
    if(state.inningHalf === InningHalf.top) {
        state.visitorLineUp.nextBatter();
        state.atBat = state.visitorLineUp.getBatter(); 
    } else if (state.inningHalf === InningHalf.bottom){
        state.homeLineUp.nextBatter();
        state.atBat = state.homeLineUp.getBatter(); 
    }
}
