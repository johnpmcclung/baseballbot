import * as botBuilder from "botbuilder";
import { InProcRunner } from "../baseballRunner/InProcRunner";

export class GameData {
    public static getInstance(session: botBuilder.Session) : InProcRunner {
        if(!session.conversationData.game) {
            return new InProcRunner();
        } else {
            return new InProcRunner(session.conversationData.game.events);
        }
    }

    public static save(session: botBuilder.Session, game: InProcRunner) {
        session.conversationData.game = { "events": game.events };
    }
}