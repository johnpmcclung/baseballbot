import * as builder from "botbuilder";
import { FlyOutCommand, Player } from "../../baseball/index";
import { GameData } from "../gameData";

export function flyOutDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        session.beginDialog("/player", "Tell me about the player who caught the ball.");
    }, (session: builder.Session, result: builder.IDialogResult<Player>) => {
        if(!result.response) { session.endDialog(); }
        var game = GameData.getInstance(session);
        try {
            game.do(new FlyOutCommand(result.response));
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            session.endDialog(`Outs: ${game.state.outs}`);
        }
    }];
}