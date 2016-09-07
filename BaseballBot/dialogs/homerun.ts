import * as builder from "botbuilder";
import { HomerunCommand } from "../../baseball/index";
import { GameData } from "../gameData";

export function homerunDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        var game = GameData.getInstance(session);
        var hitter = game.state.atBat;
        try {
            game.do(new HomerunCommand(hitter));
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            session.endDialog(`${hitter.name} has hit a homerun! The score ` +
            `is Home:${game.state.homeScore} Visitors:${game.state.visitorScore}`);
        }
    }];
}