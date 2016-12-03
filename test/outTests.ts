import {
    EventType, evolve, GameState, OutEvent
} from "../baseball/index";

describe("outs", () => {
    describe("the out event", () => {
        it("should be of type Out", () => {
            let sut = new OutEvent(0);

            sut.type.should.equal(EventType.Out);
        });
        it("should set the game state to the new out total", () => {
            let outs = 2;
            let state = new GameState();
            let sut = new OutEvent(outs);

            evolve(sut, state);

            state.outs.should.equal(outs);
        });
    });
});
