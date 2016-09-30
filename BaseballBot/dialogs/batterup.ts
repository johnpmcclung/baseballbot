import * as builder from "botbuilder";
import { BatterUpCommand, Player } from "../../baseball/index";
import { GameData } from "../gameData";

export function batterUpDialog() : Array<builder.IDialogWaterfallStep> {
    return [(session: builder.Session) => {
        var game = GameData.getInstance(session);
        try {
            game.do(new BatterUpCommand());
            GameData.save(session, game);
            session.endDialog(`${game.state.atBat!.name} steps up to the plate.`);
        }
        catch(error) {
            session.endDialog(error.message);
        }
    }];
}