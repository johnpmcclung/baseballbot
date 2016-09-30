import * as builder from "botbuilder";
import { BatterUpCommand, Player } from "../../baseball/index";
import { GameData } from "../gameData";

export function whoIsOnDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        let game = GameData.getInstance(session);

        let atBat: string = "";
        let firstBase: string = "";
        let secondBase: string = "";
        let thirdBase: string = "";

        if(game.state.atBat) {atBat = `${game.state.atBat.name}(${game.state.atBat.position})`}
        game.state.firstBase.forEach(player => {
            if(player) {firstBase = firstBase + `${player.name}(${player.position})\n `;}
        });
        game.state.secondBase.forEach(player => {
            if(player) {secondBase = secondBase + `${player.name}(${player.position})\n `;}
        });
        game.state.thirdBase.forEach(player => {
            if(player) {thirdBase = thirdBase + `${player.name}(${player.position})\n `;}
        });

        session.endDialog(`At Bat: ${atBat}\n\n First Base: ${firstBase}\n\n Second Base: ${secondBase}\n\n Third Base: ${thirdBase}`)
    }];
}