import * as builder from "botbuilder";
import { Player, RemoveFromLineUpCommand, Team } from "../../baseball/index";
import { GameData } from "../gameData";

export function removeFromLineUpDialog(): Array<builder.IDialogWaterfallStep> {
    return [(session: builder.Session) => {
        builder.Prompts.choice(session,
            `Remove a player from the line up of which team?`,
            ["Home", "Visitors"]);
    }, (session: builder.Session, result: builder.IPromptChoiceResult) => {
        session.dialogData.playerTeam = result!.response!.index;

        let game = GameData.getInstance(session);
        let lineUp: Array<Player | null>;
        let players: Array<string> = [];

        if(session.dialogData.playerTeam === Team.home) {
            lineUp = game.state.homeLineUp.getLineUp();
        } else {
            lineUp = game.state.visitorLineUp.getLineUp();
        }

        lineUp.forEach((player, index) => {
            if(player){
                players.push(`${index + 1}. ${player.name} (${player.position})`);
            } else {
                players.push("[empty]");
            }
        });

        builder.Prompts.choice(session,
            `Which player should be removed?`,
            players);
    }, (session: builder.Session, result: builder.IPromptChoiceResult) => {
        let game = GameData.getInstance(session);
        let spot = result!.response!.index + 1;
        let team = session.dialogData.playerTeam;
        let player: Player;
        if(team === Team.home) {
            player = <Player>game.state.homeLineUp.getSpot(spot);
        } else {
            player = <Player>game.state.visitorLineUp.getSpot(spot);
        }

        try {
            game.do(new RemoveFromLineUpCommand(player, team));
            GameData.save(session, game);
            session.endDialog(
                `${player.name}(${player.position}) has been removed from spot number ${spot} for the ${Team[team]} team.`
                );
        }
        catch(error) {
            session.endDialog(error.message);
        }
    }];
}