/// <reference path="../node_modules/botbuilder/lib/botbuilder.d.ts" />
import {
    BatterUpCommand, DefensivePosition, DoubleCommand, FlyOutCommand, GameState, 
    HomerunCommand, InningHalf, Player, Runner, SingleCommand, StartCommand, 
    TripleCommand 
} from "../baseball/index";
import * as builder from "botbuilder";
import { GameData } from "./gameData";

export function setupDialogs (bot: builder.UniversalBot): void {

    bot.dialog('/batterup', [(session: builder.Session) => {
        session.send("Tell me about the player coming up to bat.");
        session.beginDialog("/player");
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
    }]);

    bot.dialog('/double', (session: builder.Session) => {
        var game = GameData.getInstance(session);
        var hitter = game.state.atBat;
        try {
            game.do(new DoubleCommand(hitter));
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            session.endDialog(`${hitter.name} has hit a double! The score ` +
            `is Home:${game.state.homeScore} Visitors:${game.state.visitorScore}`);
        }
    });

    bot.dialog('/flyout', [(session: builder.Session) => {
        session.send("Tell me about the player who caught the ball.");
        session.beginDialog("/player");
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
    }]);

    bot.dialog('/homerun', (session: builder.Session) => {
        var game = GameData.getInstance(session);
        var hitter = game.state.atBat;
        try {
            game.do(new HomerunCommand(hitter));
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            session.endDialog(`${hitter.name} has hit a homerun! The score ` +
            `is Home:${game.state.homeScore} Visitors:${game.state.visitorScore}`);
        }
    });

    bot.dialog('/inning', (session: builder.Session) => {
        var game = GameData.getInstance(session);
        session.endDialog(`${InningHalf[game.state.inningHalf]} of inning number ${game.state.inning}. ${game.state.outs} outs.`);
    });

    bot.dialog('/score', (session: builder.Session) => {
        var game = GameData.getInstance(session);
        session.endDialog(`Score: Home ${game.state.homeScore} Visitors ${game.state.visitorScore}`);
    });

    bot.dialog('/single', (session: builder.Session) => {
        var game = GameData.getInstance(session);
        var hitter = game.state.atBat;
        try {
            game.do(new SingleCommand(hitter));
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            session.endDialog(`${hitter.name} has hit a single! The score ` +
            `is Home:${game.state.homeScore} Visitors:${game.state.visitorScore}`);
        }
    });

    bot.dialog('/start', (session: builder.Session) => {
        var game = GameData.getInstance(session);
        game.do(new StartCommand());
        GameData.save(session, game);
        session.endDialog("The game has started.");
    });

    bot.dialog('/triple', (session: builder.Session) => {
        var game = GameData.getInstance(session);
        var hitter = game.state.atBat;
        try {
            game.do(new TripleCommand(hitter));
            GameData.save(session, game);
        }
        catch(error) {
            session.send(error.message);
        }
        finally {
            session.endDialog(`${hitter.name} has hit a triple! The score ` +
            `is Home:${game.state.homeScore} Visitors:${game.state.visitorScore}`);
        }
    });

    bot.dialog('/player', [(session: builder.Session) => {
        builder.Prompts.text(session, "What's the player's name?");
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
    }]);
}
