/// <reference path="../typings/index.d.ts" />

import * as chai from "chai";
import { 
    GameEvent, GameState, EventType, evolve, RunScoredEvent, runScoredEventStringify, Team 
} from "../baseball/index";

chai.should();

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
        it("should return a string describing itself", () => {
            var sut = new RunScoredEvent(Team.visitor);

            var result = runScoredEventStringify(sut);

            result.should.be.equal("The " + Team[sut.properties.team].toLocaleString() + " team has scored a run.");
        });
    });
});
