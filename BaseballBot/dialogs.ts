/// <reference path="../node_modules/botbuilder/lib/botbuilder.d.ts" />
import * as builder from "botbuilder";
import { addToLineUpDialog } from "./dialogs/addToLineUp";
import { batterUpDialog } from "./dialogs/batterUp";
import { doubleDialog } from "./dialogs/double";
import { flyOutDialog } from "./dialogs/flyOut";
import { homerunDialog } from "./dialogs/homerun";
import { inningDialog } from "./dialogs/inning";
import { lineUpDialog } from "./dialogs/lineUpDialog";
import { removeFromLineUpDialog } from "./dialogs/removeFromLineUp";
import { scoreDialog } from "./dialogs/score";
import { singleDialog } from "./dialogs/single";
import { startDialog } from "./dialogs/start";
import { tripleDialog } from "./dialogs/triple";
import { whoIsOnDialog } from "./dialogs/whoIsOn";

export function setupDialogs (bot: builder.UniversalBot): void {

    bot.dialog('/addToLineUp', addToLineUpDialog());
    bot.dialog('/batterUp', batterUpDialog());
    bot.dialog('/double', doubleDialog());
    bot.dialog('/flyOut', flyOutDialog());
    bot.dialog('/homerun', homerunDialog());
    bot.dialog('/inning', inningDialog());
    bot.dialog('/lineUp', lineUpDialog());
    bot.dialog('/removeFromLineUp', removeFromLineUpDialog());
    bot.dialog('/score', scoreDialog());
    bot.dialog('/single', singleDialog());
    bot.dialog('/start', startDialog());
    bot.dialog('/triple', tripleDialog());
    bot.dialog('/whoIsOn', whoIsOnDialog());
}
