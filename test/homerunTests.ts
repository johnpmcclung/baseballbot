/// <reference path="../typings/index.d.ts" />

import * as chai from "chai";
import * as lodash from "lodash";
import {
    DefensivePosition, EventType, GameEvent, GameState, HomerunCommand, HomerunEvent,
    homerunEventStringify, InningHalf, Player, RunScoredEvent, Team
} from "../baseball/index";
import { PlayerBuilder, GameStateBuilder } from "./stateBuilder";

chai.should();

describe("homerun", () => {
    describe("the homerun command", () => {
        it("adds a homerun event", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .build();
            var sut = new HomerunCommand(player);

            sut.do(events, state);
            lodash.findIndex(events, {type: EventType.Homerun})
                .should.not.equal(-1, "Could not find a homerun event.");
        });
        it("adds a run scored event for the visiting team in the top of the inning", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .build();
            var sut = new HomerunCommand(player);

            sut.do(events, state);

            lodash.findIndex(events, {type: EventType.RunScored, properties: { team: Team.visitor }})
                .should.not.equal(-1, "Could not find a run scored event for the visiting team.");
        });
        it("adds a run scored event for the home team in the bottom of the inning", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withInningHalf(InningHalf.bottom)
                .build();
            var sut = new HomerunCommand(player);

            sut.do(events, state);

            lodash.findIndex(events, {type: EventType.RunScored, properties: { team: Team.home }})
                .should.not.equal(-1, "Could not find a run scored event for the visiting team.");
        });
        it("fails if the game is already over", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withGameOver(true)
                .build();
            var sut = new HomerunCommand(player);

            (function() { sut.do(events, state); }).should
                .throw("Game has already finished.", "Game was allowed to start a finished game.");
        });
        it("throws an error if the game is not started", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withStarted(false)
                .build();
            var sut = new HomerunCommand(player);

            (function() { sut.do(events, state); }).should
                .throw("Game has not started.",
                "Game was allowed to record a homerun before starting.");
        });
        it("throws an error if no batter is up", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder().build();
            var sut = new HomerunCommand(player);

            (function() { sut.do(events, state); }).should
                .throw("There is no batter at the plate.",
                "Game was allowed to record a homerun with no batter up.");
        });
    });

    describe("the homerun event", () => {
        it("should be of type Homerun", () => {
            var player = new PlayerBuilder().build();
            var sut = new HomerunEvent(player);

            sut.type.should.equal(EventType.Homerun);
        });
        it("should return a string describing itself", () => {
            var player = new PlayerBuilder().build();
            var sut = new HomerunEvent(player);

            var result = homerunEventStringify(sut);

            result.should.be.equal("Turd Ferguson hit a homerun. (HR)");
        });
    });
});
