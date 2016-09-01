/// <reference path="../typings/index.d.ts" />

import * as chai from "chai";
import * as lodash from "lodash";
import {
    DefensivePosition, EventType, evolve, FlyOutCommand, FlyOutEvent, flyOutEventStringify, 
    GameEvent, GameOverEvent, GameState, InningEvent, InningHalf, InningHalfEvent, OutEvent, 
    Player, Team
} from "../baseball/index";
import { PlayerBuilder, GameStateBuilder } from "./stateBuilder";

chai.should();

describe("fly outs", () => {
    describe("the fly out command", () => {
        it("adds a fly out event", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.FlyOut })
                .should.not.equal(-1, "Could not find a fly out event.");
        });
        it("adds an out event", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.Out })
                .should.not.equal(-1, "Could not find an out event.");
        });
        it("throws an error if the game is not started", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withStarted(false)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            (function() { sut.do(events, state); }).should
                .throw("Game has not started.",
                "Game was allowed to record an out before starting.");
        });
        it("throws an error if the inning half wasn't set", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withOuts(2)
                .withInningHalf(InningHalf.none)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            (function() { sut.do(events, state); }).should
                .throw("Game is not started or already ended.",
                "Game allowed an out while the inning half wasn't not initialized.");
        });
        it("third out sets outs back to zero", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withOuts(2)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.Out, properties: { outs: 0 }})
                .should.not.equal(-1, "Could not find an out event.");
        });
        it("third out sets inningHalf to opposite", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withOuts(2)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.InningHalf, properties: {inningHalf: InningHalf.bottom }})
                .should.not.equal(-1, "Could not find an inning half event.");
        });
        it("third out and inning half from bottom to top advances inning count", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withOuts(2)
                .withInningHalf(InningHalf.bottom)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.Inning, properties: {inningNumber: 2 }})
                .should.not.equal(-1, "Could not find an inning event.");
        });
        it("after the top of the ninth inning if the home team is winning add a game over event", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withOuts(2)
                .withInningHalf(InningHalf.top)
                .withInning(9)
                .withHomeScore(2)
                .withVisitorScore(1)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.GameOver, properties: {winner: Team.home }})
                .should.not.equal(-1, "Could not find a game over event with the home team winning.");
        });
        it("after the bottom of any inning greater than eight and if the runs are not the same for each team add a game over event", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withOuts(2)
                .withInningHalf(InningHalf.bottom)
                .withInning(9)
                .withHomeScore(2)
                .withVisitorScore(1)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.GameOver, properties: {winner: Team.home }})
                .should.not.equal(-1, "Could not find a game over event with the home team winning.");
        });
        it("after the bottom of any inning greater than eight and if the visiting team is winning add a game over event", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withOuts(2)
                .withInningHalf(InningHalf.bottom)
                .withInning(9)
                .withHomeScore(1)
                .withVisitorScore(2)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.GameOver, properties: {winner: Team.visitor }})
                .should.not.equal(-1, "Could not find a game over event with the visiting team winning.");
        });
        it("throws an error if the game is not started", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withStarted(false)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            (function() { sut.do(events, state); }).should
                .throw("Game has not started.",
                "Game was allowed to record a fly out before starting.");
        });
        it("throws an error if the game is already over", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .withGameOver(true)
                .build();
            var sut = new FlyOutCommand(defensivePlayer);

            (function() { sut.do(events, state); }).should
                .throw("Game has already finished.", "Fly out was allowed in a finished game.");
        });
        it("fails if no batter is up", () => {
            var defensivePlayer = new PlayerBuilder().build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder().build();
            var sut = new FlyOutCommand(defensivePlayer);

            (function() { sut.do(events, state); }).should
                .throw("There is no batter at the plate.", "Fly out was allowed without a batter.");
        });
    });

    describe("the fly out event", () => {
        it("should be of type FlyOut", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var sut = new FlyOutEvent(offensivePlayer, defensivePlayer);

            sut.type.should.equal(EventType.FlyOut);
        });
        it("should return a string describing itself", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var sut = new FlyOutEvent(offensivePlayer, defensivePlayer);

            var result = flyOutEventStringify(sut);

            result.should.be.equal(
                `${offensivePlayer.name} hit a fly ball to ${defensivePlayer.name}. (F${defensivePlayer.position})`
            );
        });
        it("removes player from batter up state", () => {
            var offensivePlayer = new PlayerBuilder().build();
            var defensivePlayer = new PlayerBuilder()
                .withName("Bill Burber")
                .withPosition(DefensivePosition.centerField)
                .build();
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withAtBat(offensivePlayer)
                .build();
            var sut = new FlyOutEvent(offensivePlayer, defensivePlayer);

            evolve(sut, state);

            state.should.have.property("atBat").equal(null);
        });
    });
});
