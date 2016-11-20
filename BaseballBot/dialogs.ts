/// <reference path="../node_modules/botbuilder/lib/botbuilder.d.ts" />
import * as builder from "botbuilder";
import { addToLineUpDialog } from "./dialogs/addToLineUp";
import { batterUpDialog } from "./dialogs/batterup";
import { doubleDialog } from "./dialogs/double";
import { flyOutDialog } from "./dialogs/flyOut";
import { homerunDialog } from "./dialogs/homerun";
import { lineUpDialog } from "./dialogs/lineUpDialog";
import { inningDialog } from "./dialogs/inning";
import { removeFromLineUpDialog } from "./dialogs/removeFromLineUp";
import { scoreDialog } from "./dialogs/score";
import { singleDialog } from "./dialogs/single";
import { startDialog } from "./dialogs/start";
import { tripleDialog } from "./dialogs/triple";
import { whoIsOnDialog } from "./dialogs/whoison";

export function setupDialogs (bot: builder.UniversalBot): void {

    bot.dialog('/addToLineUp', addToLineUpDialog());
    bot.dialog('/batterup', batterUpDialog());
    bot.dialog('/double', doubleDialog());
    bot.dialog('/flyout', flyOutDialog());
    bot.dialog('/homerun', homerunDialog());
    bot.dialog('/inning', inningDialog());
    bot.dialog('/lineUp', lineUpDialog());
    bot.dialog('/removeFromLineUp', removeFromLineUpDialog());
    bot.dialog('/score', scoreDialog());
    bot.dialog('/single', singleDialog());
    bot.dialog('/start', startDialog());
    bot.dialog('/triple', tripleDialog());
    bot.dialog('/whoison', whoIsOnDialog());
}
