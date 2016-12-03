/// <reference path="./node_modules/botbuilder/lib/botbuilder.d.ts" />
import * as builder from "botbuilder";
import * as restify from "restify";
import { setupDialogs } from "./BaseballBot/dialogs";
import { setupIntents } from "./BaseballBot/intents";

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
let connector = new builder.ChatConnector({
    "appId": process.env.MICROSOFT_APP_ID,
    "appPassword": process.env.MICROSOFT_APP_PASSWORD
});
let bot = new builder.UniversalBot(connector, { "persistConversationData": true });
server.post('/api/messages', connector.listen());

setupIntents(bot);
setupDialogs(bot);
