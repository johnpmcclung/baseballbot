import * as builder from "botbuilder";
import { StartCommand } from "../../baseball/index";
import { GameData } from "../gameData";

export function startDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        var game = GameData.getInstance(session);
        try {
            game.do(new StartCommand());
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            if(game.state.started) {
                session.endDialog("The game has started.");
            } else {
                session.endDialog("The game did not start.");
            }
        }
    }];
}