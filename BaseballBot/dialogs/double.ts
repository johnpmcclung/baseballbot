import * as builder from "botbuilder";
import { DoubleCommand } from "../../baseball/index";
import { GameData } from "../gameData";

export function doubleDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        let game = GameData.getInstance(session);
        let hitter = game.state.atBat;
        try {
            game.do(new DoubleCommand(hitter));
            GameData.save(session, game);

            session.endDialog(`${hitter!.name} has hit a double! The score ` +
            `is Home:${game.state.homeScore} Visitors:${game.state.visitorScore}`);
        }
        catch(error) {
            session.endDialog(error.message);
        }
    }];
}