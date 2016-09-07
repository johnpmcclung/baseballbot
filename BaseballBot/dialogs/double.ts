import * as builder from "botbuilder";
import { DoubleCommand } from "../../baseball/index";
import { GameData } from "../gameData";

export function doubleDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        var game = GameData.getInstance(session);
        var hitter = game.state.atBat;
        try {
            game.do(new DoubleCommand(hitter));
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            session.endDialog(`${hitter.name} has hit a double! The score ` +
            `is Home:${game.state.homeScore} Visitors:${game.state.visitorScore}`);
        }
    }];
}