import * as builder from "botbuilder";
import { BatterUpCommand, Player } from "../../baseball/index";
import { GameData } from "../gameData";

export function batterUpDialog() : Array<builder.IDialogWaterfallStep> {
    return [(session: builder.Session) => {
        session.beginDialog("/player", "Tell me about the player coming up to bat.");
    }, (session: builder.Session, result: builder.IDialogResult<Player>) => {
        if(!result.response) { session.endDialog(); }
        var game = GameData.getInstance(session);
        try {
            game.do(new BatterUpCommand(result.response));
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            session.endDialog(`${game.state.atBat.name} steps up to the plate.`);
        }
    }];
}