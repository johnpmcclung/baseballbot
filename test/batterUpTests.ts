import { should, expect } from "chai";
import * as lodash from "lodash";
import {
    BatterUpCommand, BatterUpEvent, batterUpEventStringify, DefensivePosition, EventType, evolve,
    InningHalf, GameEvent, GameState, LineUp, Player
} from "../baseball/index";
import { PlayerBuilder, GameStateBuilder } from "./stateBuilder";

should();

describe("batter up", () => {
    describe("Batter up command", () => {
        it("adds a batter up event", () => {
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder().build();
            var player = new PlayerBuilder().build();
            var sut = new BatterUpCommand();

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.BatterUp })
                .should.not.equal(-1, "Could not find a batter up event.");
        });
        it("throws an error if the game is not started", () => {
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder().withStarted(false).build();
            var player = new PlayerBuilder().build();
            var sut = new BatterUpCommand();

            (function() { sut.do(events, state); }).should
                .throw("Game has not started.",
                "Game was allowed to record an out before starting.");
        });
        it("fails if the game is already over", () => {
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder().withGameOver(true).build();
            var player = new PlayerBuilder().build();
            var sut = new BatterUpCommand();

            (function() { sut.do(events, state); }).should
                .throw("Game has already finished.", "Game was allowed to start a finished game.");
        });
        it("fails if the batter is already up", () => {
            var events: Array<GameEvent> = [];
            var player1 = new PlayerBuilder().build();
            var player2 = new PlayerBuilder()
                .withName("Bill Ferguson")
                .withPosition(DefensivePosition.pitcher)
                .build();
            var state = new GameStateBuilder().withAtBat(player1).build();
            var sut = new BatterUpCommand();

            (function() { sut.do(events, state); }).should
                .throw("Batter is already at the plate.");
        });
        it("fails if there is more than one player on first", () => {
            var events: Array<GameEvent> = [];
            var player1 = new PlayerBuilder().build();
            var player2 = new PlayerBuilder()
                .withName("Bill Ferguson")
                .withPosition(DefensivePosition.pitcher)
                .build();
            var player3 = new PlayerBuilder()
                .withName("Ed Ferguson")
                .withPosition(DefensivePosition.firstBase)
                .build();
            var state = new GameStateBuilder()
                .withFirstBasePlayers([player1, player2])
                .build();
            var sut = new BatterUpCommand();

            (function() { sut.do(events, state); }).should
                .throw("Game is in an invalid state for a new batter.");
        });
    });

    describe("the batter up event", () => {
        it("should be of type BatterUp", () => {
            var player = new PlayerBuilder().build();
            var sut = new BatterUpEvent();

            sut.type.should.equal(EventType.BatterUp);
        });
        it("should return a string describing itself", () => {
            var player = new PlayerBuilder().build();
            var sut = new BatterUpEvent();

            var result = batterUpEventStringify(sut);

            result.should.be.equal("A batter comes to the plate.");
        });
        it("moves the lineup of the batting team.", () => {
            var events: Array<GameEvent> = [];
            var player1 = new PlayerBuilder().build();
            var player2 = new PlayerBuilder()
                .withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop)
                .build();
            var lineup = new LineUp();
            lineup.add(player1, 1);
            lineup.add(player2, 2);
            lineup.nextBatter();
            var state = new GameStateBuilder()
                .withHomeLineUp(lineup)
                .withInningHalf(InningHalf.bottom).build();
            var sut = new BatterUpEvent();

            expect(state.homeLineUp.getBatter()).to.equal(player1);
            evolve(sut, state);
            expect(state.homeLineUp.getBatter()).to.equal(player2);
        });
    });
});
