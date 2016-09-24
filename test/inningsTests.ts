import * as chai from "chai";
import {
    EventType, evolve, GameEvent, GameOverEvent, gameOverEventStringify, GameState, 
    InningEvent, inningEventStringify, InningHalf, InningHalfEvent, 
    inningHalfEventStringify, Team
} from "../baseball/index";

chai.should();

describe("innings", () => {
    describe("the inning event", () => {
        it("should be of type Inning", () => {
            var sut = new InningEvent(1);

            sut.type.should.equal(EventType.Inning);
        });
        it("should set the game state to the new inning", () => {
            var inning = 5;
            var state = new GameState();
            var sut = new InningEvent(inning);

            evolve(sut, state);

            state.inning.should.equal(inning);
        });
        it("should return a string describing itself", () => {
            var sut = new InningEvent(2);

            var result = inningEventStringify(sut);

            result.should.be.equal("Inning number " + sut.properties.inningNumber + " has begun.");
        });
    });

    describe("the inningHalf event", () => {
        it("should be of type InningHalf", () => {
            var sut = new InningHalfEvent(InningHalf.bottom);

            sut.type.should.equal(EventType.InningHalf);
        });
        it("should set the game state to the new inningHalf", () => {
            var inningHalf = InningHalf.bottom;
            var state = new GameState();
            var sut = new InningHalfEvent(inningHalf);

            evolve(sut, state);

            state.inningHalf.should.equal(inningHalf);
        });
        it("should return a string describing itself", () => {
            var sut = new InningHalfEvent(InningHalf.bottom);

            var result = inningHalfEventStringify(sut);

            result.should.be.equal(
                "The " + InningHalf[sut.properties.inningHalf].toLocaleString() +
                    " of the inning has begun."
            );
        });
    });

    describe("the game over event", () => {
        it("should be of type GameOver", () => {
            var sut = new GameOverEvent(Team.home);

            sut.type.should.equal(EventType.GameOver);
        });
        it("should set the state to game over", () => {
            var state = new GameState();
            var sut = new GameOverEvent(Team.home);

            evolve(sut, state);

            state.gameOver.should.equal(true);
        });
        it("set winner to winning team", () => {
            var state = new GameState();
            var sut = new GameOverEvent(Team.home);

            evolve(sut, state);

            state.winner.should.equal(Team.home);
        });
        it("should return a string describing itself", () => {
            var sut = new GameOverEvent(Team.home);

            var result = gameOverEventStringify(sut);

            result.should.be.equal("The " + Team[sut.properties.winner].toLocaleString() + " team has won the game.");
        });
    });
});
