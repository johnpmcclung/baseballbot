import * as builder from "botbuilder";
import { SingleCommand } from "../../baseball/index";
import { GameData } from "../gameData";

export function singleDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        var game = GameData.getInstance(session);
        var hitter = game.state.atBat;
        try {
            if(!hitter) {
                throw new Error("No one is at bat.");
            }
            game.do(new SingleCommand(hitter));
            GameData.save(session, game);
            session.endDialog(`${hitter!.name} has hit a single! The score ` +
            `is Home:${game.state.homeScore} Visitors:${game.state.visitorScore}`);
        }
        catch(error) {
            session.endDialog(error.message);
        }
    }];
}