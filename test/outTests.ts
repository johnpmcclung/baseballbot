/// <reference path="../typings/index.d.ts" />

import * as chai from "chai";
import * as lodash from "lodash";
import {
    EventType, evolve, GameEvent, GameOverEvent, GameState, InningEvent, InningHalfEvent,
    InningHalf, OutCommand, OutEvent, outEventStringify, Team
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
        it("should return a string describing itself", () => {
            var sut = new OutEvent(2);

            var result = outEventStringify(sut);

            result.should.be.equal("There are " + sut.properties.outs + " outs.");
        });
    });
});
