/// <reference path="../node_modules/botbuilder/lib/botbuilder.d.ts" />
import * as botBuilder from "botbuilder";

export function setupIntents (bot: botBuilder.UniversalBot): void {
    var intent = new botBuilder.IntentDialog()
        .matches(/^addplayer/i, '/addToLineUp')
        .matches(/^batterup/i, '/batterup')
        .matches(/^double/i, '/double')
        .matches(/^flyout/i, '/flyout')
        .matches(/^homerun/i, '/homerun')
        .matches(/^lineup/i, '/lineUp')
        .matches(/^inning/i, '/inning')
        .matches(/^removeplayer/i, '/removeFromLineUp')
        .matches(/^score/i, '/score')
        .matches(/^single/i, '/single')
        .matches(/^start/i, '/start')
        .matches(/^triple/i, '/triple')
        .matches(/^whoison/i, '/whoison')
        .onDefault(botBuilder.DialogAction.send("try start, batterup, homerun, flyout"));
    bot.dialog("/", intent);
}