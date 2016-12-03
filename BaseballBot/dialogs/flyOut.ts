import * as builder from "botbuilder";
import { FlyOutCommand, InningHalf, Player } from "../../baseball/index";
import { GameData } from "../gameData";

export function flyOutDialog(): Array<builder.IDialogWaterfallStep> {
    return  [(session: builder.Session) => {
        let game = GameData.getInstance(session);
        let lineUp: Array<Player | null>;
        let players: Array<string> = [];

        if(game.state.inningHalf === InningHalf.top) {
            lineUp = game.state.homeLineUp.getLineUp();
        } else if(game.state.inningHalf === InningHalf.bottom) {
            lineUp = game.state.visitorLineUp.getLineUp();
        } else {
            throw new Error("Game not started");
        }

        lineUp.forEach((player, index) => {
            if(player){
                players.push(`${index + 1}. ${player.name} (${player.position})`);
            } else {
                players.push("[empty]");
            }
        });

        builder.Prompts.choice(session,
            `Which player caught the ball?`,
            players);
    }, (session: builder.Session, result: builder.IPromptChoiceResult) => {
        let game = GameData.getInstance(session);
        let spot = result!.response!.index + 1;
        let player: Player;
        if(game.state.inningHalf === InningHalf.top) {
            player = <Player>game.state.homeLineUp.getSpot(spot);
        } else {
            player = <Player>game.state.visitorLineUp.getSpot(spot);
        }

        try {
            game.do(new FlyOutCommand(player));
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