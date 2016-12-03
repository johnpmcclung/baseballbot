import { expect } from "chai";
import * as _ from "lodash";
import {
    BatterUpCommand, BatterUpEvent, DefensivePosition, EventType, evolve,
    InningHalf, LineUp
} from "../baseball/index";
import { GameStateBuilder, PlayerBuilder } from "./stateBuilder";

describe("batter up", () => {
    describe("Batter up command", () => {
        it("adds a batter up event", () => {
            let state = new GameStateBuilder().build();
            let sut = new BatterUpCommand();

            let results = sut.do(state);

            _.findIndex(results, { "type": EventType.BatterUp })
                .should.not.equal(-1, "Could not find a batter up event.");
        });
        it("throws an error if the game is not started", () => {
            let state = new GameStateBuilder().withStarted(false).build();
            let sut = new BatterUpCommand();

            (function() { sut.do(state); }).should
                .throw("Game has not started.",
                "Game was allowed to record an out before starting.");
        });
        it("fails if the game is already over", () => {
            let state = new GameStateBuilder().withGameOver(true).build();
            let sut = new BatterUpCommand();

            (function() { sut.do(state); }).should
                .throw("Game has already finished.", "Game was allowed to start a finished game.");
        });
        it("fails if the batter is already up", () => {
            let player1 = new PlayerBuilder().build();
            let state = new GameStateBuilder().withAtBat(player1).build();
            let sut = new BatterUpCommand();

            (function() { sut.do(state); }).should
                .throw("Batter is already at the plate.");
        });
        it("fails if there is more than one player on first", () => {
            let player1 = new PlayerBuilder().build();
            let player2 = new PlayerBuilder()
                .withName("Bill Ferguson")
                .withPosition(DefensivePosition.pitcher)
                .build();
            let state = new GameStateBuilder()
                .withFirstBasePlayers([player1, player2])
                .build();
            let sut = new BatterUpCommand();

            (function() { sut.do(state); }).should
                .throw("Game is in an invalid state for a new batter.");
        });
    });

    describe("the batter up event", () => {
        it("should be of type BatterUp", () => {
            let sut = new BatterUpEvent();

            sut.type.should.equal(EventType.BatterUp);
        });
        it("moves the lineup of the batting team.", () => {
            let player1 = new PlayerBuilder().build();
            let player2 = new PlayerBuilder()
                .withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop)
                .build();
            let lineup = new LineUp();
            lineup.add(player1, 1);
            lineup.add(player2, 2);
            lineup.nextBatter();
            let state = new GameStateBuilder()
                .withHomeLineUp(lineup)
                .withInningHalf(InningHalf.bottom).build();
            let sut = new BatterUpEvent();

            expect(state.homeLineUp.getBatter()).to.equal(player1);
            evolve(sut, state);
            expect(state.homeLineUp.getBatter()).to.equal(player2);
        });
    });
});
