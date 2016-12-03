import * as builder from "botbuilder";
import { AddToLineUpCommand, DefensivePosition, Player, Team } from "../../baseball/index";
import { GameData } from "../gameData";

export function addToLineUpDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        builder.Prompts.text(session, `What's the player's name?`);
    }, (session: builder.Session, result: builder.IPromptTextResult) => {
        session.dialogData.playerName = result.response;
        builder.Prompts.choice(session, `What position does ${result.response} play?`, [
            "Pitcher", "Catcher", "First Base", "Second Base", "Third Base", "Shortstop",
            "Left Field", "Center Field", "Right Field"
            ]);
    }, (session: builder.Session, result: builder.IPromptChoiceResult) => {
        session.dialogData.playerPosition = DefensivePosition[result!.response!.index + 1];
        builder.Prompts.choice(session, `On what team does ${session.dialogData.playerName} play?`, ["Home", "Visitors"]);
    }, (session: builder.Session, result: builder.IPromptChoiceResult) => {
        session.dialogData.playerTeam = result!.response!.index;
        builder.Prompts.number(session, `In what spot will ${session.dialogData.playerName} be batting?`);
    }, (session: builder.Session, result: builder.IPromptNumberResult) => {
        if(result!.response < 1 || result!.response > 9) {
            session.endDialog("Invalid Line Up spot.");
            return;
        }
        let player = new Player(session.dialogData.playerName, session.dialogData.playerPosition);
        let spot = result!.response!;
        let team = session.dialogData.playerTeam;
        let game = GameData.getInstance(session);
        try {
            game.do(new AddToLineUpCommand(player, spot, team));
            GameData.save(session, game);
            session.endDialog(
                `${player.name}(${player.position}) is in the line up at spot number ${spot} for the ${Team[team]} team.`
                );
        }
        catch(error) {
            session.endDialog(error.message);
        }
        session.endDialogWithResult({ "response": player, "resumed": builder.ResumeReason.completed });
    }];
}
