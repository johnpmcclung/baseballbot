import * as chai from "chai";
import * as lodash from "lodash";
import {
    EventType, evolve, GameEvent, GameState, InningEvent, InningHalf, InningHalfEvent,
    StartCommand, StartEvent, startEventStringify, Team
} from "../baseball/index";
import { GameStateBuilder } from "./stateBuilder";

chai.should();

describe("start", () => {
    describe("the start command", () => {
        it("creates a start event", () => {
            var events: Array<GameEvent> = [];
            var state = new GameState();
            var sut = new StartCommand();

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.Start })
                .should.not.equal(-1, "Could not find start event.");
        });
        it("fails if the game is already started", () => {
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder().build();
            var sut = new StartCommand();

            (function() { sut.do(events, state); }).should
                .throw("The game cannot be started again.", "Game was allowed to start twice.");
        });
        it("fails if the game is already over", () => {
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder()
                .withStarted(false)
                .withGameOver(true)
                .build();
            var sut = new StartCommand();

            (function() { sut.do(events, state); }).should
                .throw("The game cannot be started again.", "Game was allowed to start a finished game.");
        });
        it("creates first inning event", () => {
            var events: Array<GameEvent> = [];
            var state = new GameState();
            var sut = new StartCommand();

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.Inning, properties: { inningNumber: 1 }})
                .should.not.equal(-1, "Could not find an inning event with a number of 1.");
        });
        it("adds top inning half event", () => {
            var events: Array<GameEvent> = [];
            var state = new GameState();
            var sut = new StartCommand();

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.InningHalf, properties: { inningHalf: InningHalf.top }})
                .should.not.equal(-1, "Could not find an inningHalf event with a value of top.");
        });
    });

    describe("the start event", () => {
        it("should be of type Start", () => {
            var sut = new StartEvent();

            sut.type.should.equal(EventType.Start);
        });
        it("should set the game state to started", () => {
            var currentState = new GameState();
            var sut = new StartEvent();

            evolve(sut, currentState);

            currentState.started.should.equal(true);
        });
        it("should return a string describing itself", () => {
            var sut = new StartEvent();

            var result = startEventStringify(sut);

            result.should.be.equal("Game started.");
        });
    });
});
