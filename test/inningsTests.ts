import { expect } from "chai";
import {
    EventType, evolve, GameOverEvent, GameState,
    InningEvent, InningHalf, InningHalfEvent, Team
} from "../baseball/index";

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

            expect(state.winner).to.not.be.null;
            (<Team>state.winner).should.equal(Team.home);
        });
    });
});
