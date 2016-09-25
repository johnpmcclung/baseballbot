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
            if(!result.response) {
                throw new Error("Player is required.");
            }
            game.do(new BatterUpCommand(<Player>result.response));
            GameData.save(session, game);
            session.endDialog(`${game.state.atBat!.name} steps up to the plate.`);
        }
        catch(error) {
            session.endDialog(error.message);
        }
    }];
}