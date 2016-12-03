import {
    EventType, evolve, GameState, RunScoredEvent, Team
} from "../baseball/index";

describe("scoring", () => {
    describe("the run scored event", () => {
        it("should be of type RunScored", () => {
            let sut = new RunScoredEvent(Team.home);

            sut.type.should.equal(EventType.RunScored);
        });
        it("should add a run to the score of the home team", () => {
            let state = new GameState();
            let sut = new RunScoredEvent(Team.home);

            evolve(sut, state);

            state.homeScore.should.equal(1);
        });
        it("should add a run to the score of the visiting team", () => {
            let state = new GameState();
            let sut = new RunScoredEvent(Team.visitor);

            evolve(sut, state);

            state.visitorScore.should.equal(1);
        });
    });
});
