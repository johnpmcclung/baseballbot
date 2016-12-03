import * as botBuilder from "botbuilder";

export function setupIntents (bot: botBuilder.UniversalBot): void {
    let intent = new botBuilder.IntentDialog()
        .matches(/^[Aa]dd\s*[Pp]layer/i, '/addToLineUp')
        .matches(/^[Bb]atter\s*[Uu]p/i, '/batterUp')
        .matches(/^[Dd]ouble/i, '/double')
        .matches(/^[Ff]ly\s*[Oo]ut/i, '/flyOut')
        .matches(/^[Hh]omerun/i, '/homerun')
        .matches(/^[Ll]ine\s*[Uu]p/i, '/lineUp')
        .matches(/^[Ii]nning/i, '/inning')
        .matches(/^[Rr]emove[Pp]layer/i, '/removeFromLineUp')
        .matches(/^[Ss]core/i, '/score')
        .matches(/^[Ss]ingle/i, '/single')
        .matches(/^[Ss]tart/i, '/start')
        .matches(/^[Tt]riple/i, '/triple')
        .matches(/^[Ww]ho\s*[Ii]s\s*[Oo]n/i, '/whoIsOn')
        .onDefault(botBuilder.DialogAction.send("try start, batter up, homerun, fly out"));
    bot.dialog("/", intent);
}