/// <reference path="../node_modules/botbuilder/lib/botbuilder.d.ts" />
import * as builder from "botbuilder";
import { GameData } from "./gameData";
import { batterUpDialog } from "./dialogs/batterup";
import { doubleDialog } from "./dialogs/double";
import { flyOutDialog } from "./dialogs/flyOut";
import { homerunDialog } from "./dialogs/homerun";
import { inningDialog } from "./dialogs/inning";
import { playerDialog } from "./dialogs/player";
import { scoreDialog } from "./dialogs/score";
import { singleDialog } from "./dialogs/single";
import { startDialog } from "./dialogs/start";
import { tripleDialog } from "./dialogs/triple";

export function setupDialogs (bot: builder.UniversalBot): void {

    bot.dialog('/batterup', batterUpDialog());
    bot.dialog('/double', doubleDialog());
    bot.dialog('/flyout', flyOutDialog());
    bot.dialog('/homerun', homerunDialog());
    bot.dialog('/inning', inningDialog());
    bot.dialog('/score', scoreDialog());
    bot.dialog('/single', singleDialog());
    bot.dialog('/start', startDialog());
    bot.dialog('/triple', tripleDialog());
    bot.dialog('/player', playerDialog());
}
