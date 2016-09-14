import * as builder from "botbuilder";
import { DefensivePosition, Player } from "../../baseball/index";
import { GameData } from "../gameData";

export function playerDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session, playerInfo: string) => {
        builder.Prompts.text(session, `${playerInfo} What's the player's name?`);
    }, (session: builder.Session, result: builder.IPromptTextResult) => {
        session.dialogData.playerName = result.response;
        builder.Prompts.choice(session, `What position does ${result.response} play?`, [
            "Pitcher", "Catcher", "First Base", "Second Base", "Third Base", "Shortstop", 
            "Left Field", "Center Field", "Right Field"
            ]);
    }, (session: builder.Session, result: builder.IPromptChoiceResult) => {
        session.dialogData.playerPosition = DefensivePosition[result.response.index + 1];
        builder.Prompts.confirm(session, `${session.dialogData.playerName} (${session.dialogData.playerPosition}), is this right?`);
    }, (session: builder.Session, result: builder.IPromptConfirmResult) => {
        var player = new Player(session.dialogData.playerName, session.dialogData.playerPosition);
        session.endDialogWithResult({response: player, resumed: builder.ResumeReason.completed});
    }];
}