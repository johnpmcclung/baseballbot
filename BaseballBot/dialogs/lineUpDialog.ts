import * as builder from "botbuilder";
import { Player, RemoveFromLineUpCommand, Team } from "../../baseball/index";
import { GameData } from "../gameData";

export function lineUpDialog(): Array<builder.IDialogWaterfallStep> {
    return [(session: builder.Session) => {
        let game = GameData.getInstance(session);
        let homeLineUp: Array<Player | null>;
        let visitorLineUp: Array<Player | null>;
        let output: string = "";

        output = output + "Home Team\n";
        game.state.homeLineUp.getLineUp().forEach((player, index) => {
            if(player){
                output = output + `${index + 1}. ${player.name} (${player.position})\n`;
            } else {
                output = output + `${index + 1}. [empty]\n`;
            }
        });

        output = output + "\n\nVisiting Team\n";
        game.state.visitorLineUp.getLineUp().forEach((player, index) => {
            if(player){
                output = output + `${index + 1}. ${player.name} (${player.position})\n`;
            } else {
                output = output + `${index + 1}. [empty]\n`;
            }
        });
        session.endDialog(output);
    }];
}