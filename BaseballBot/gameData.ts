/// <reference path="../node_modules/botbuilder/lib/botbuilder.d.ts" />
import { Runner } from "../baseball/index";
import * as botBuilder from "botbuilder";

export class GameData {
    public static getInstance(session: botBuilder.Session) : Runner {
        if(!session.conversationData.game) {
            return new Runner();
        } else {
            return new Runner(session.conversationData.game.events);
        }
    }

    public static save(session: botBuilder.Session, game: Runner) {
        session.conversationData.game = { events: game.events };
    }
}