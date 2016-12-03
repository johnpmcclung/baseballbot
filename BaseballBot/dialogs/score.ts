import * as builder from "botbuilder";
import { GameData } from "../gameData";

export function scoreDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        let game = GameData.getInstance(session);
        session.endDialog(`Score: Home ${game.state.homeScore} Visitors ${game.state.visitorScore}`);
    }];
}