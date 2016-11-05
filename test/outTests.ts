import * as chai from "chai";
import * as lodash from "lodash";
import {
    EventType, evolve, GameEvent, GameOverEvent, GameState, InningEvent, InningHalfEvent,
    InningHalf, OutCommand, OutEvent, Team
} from "../baseball/index";

chai.should();

describe("outs", () => {
    describe("the out event", () => {
        it("should be of type Out", () => {
            var sut = new OutEvent(0);

            sut.type.should.equal(EventType.Out);
        });
        it("should set the game state to the new out total", () => {
            var outs = 2;
            var state = new GameState();
            var sut = new OutEvent(outs);

            evolve(sut, state);

            state.outs.should.equal(outs);
        });
    });
});
