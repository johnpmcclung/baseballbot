import * as builder from "botbuilder";
import { InningHalf } from "../../baseball/index";
import { GameData } from "../gameData";

export function inningDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        var game = GameData.getInstance(session);
        session.endDialog(`${InningHalf[game.state.inningHalf]} of inning number ${game.state.inning}. ${game.state.outs} outs.`);
    }];
}