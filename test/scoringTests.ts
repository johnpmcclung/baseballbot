import {
    GameState, EventType, evolve, RunScoredEvent, Team
} from "../baseball/index";

describe("scoring", () => {
    describe("the run scored event", () => {
        it("should be of type RunScored", () => {
            var sut = new RunScoredEvent(Team.home);

            sut.type.should.equal(EventType.RunScored);
        });
        it("should add a run to the score of the home team", () => {
            var state = new GameState();
            var sut = new RunScoredEvent(Team.home);

            evolve(sut, state);

            state.homeScore.should.equal(1);
        });
        it("should add a run to the score of the visiting team", () => {
            var state = new GameState();
            var sut = new RunScoredEvent(Team.visitor);

            evolve(sut, state);

            state.visitorScore.should.equal(1);
        });
    });
});
