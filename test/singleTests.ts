import * as chai from "chai";
import * as lodash from "lodash";
import { 
    DefensivePosition, EventType, GameEvent, GameState, Player, SingleCommand, SingleEvent
} from "../baseball/index";
import { PlayerBuilder, GameStateBuilder } from "./stateBuilder";

chai.should();

describe("single", () => {
    describe("the single command", () => {
        it("creates a single event", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder().withAtBat(player).build();
            var sut = new SingleCommand(player);

            sut.do(events, state);

            lodash.findIndex(events, { type: EventType.Single })
                .should.not.equal(-1, "Could not find single event.");
        });
        it("fails if the game is already over", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withGameOver(true)
                .build();
            var sut = new SingleCommand(player);

            (function() { sut.do(events, state); }).should
                .throw("Game has already finished.",
                "Finished game was allowed to have a single.");
        });
        it("throws an error if the game is not started", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withStarted(false)
                .build();
            var sut = new SingleCommand(player);

            (function() { sut.do(events, state); }).should
                .throw("Game has not started.",
                "Unstarted game was allowed to have a single.");
        });
        it("throws an error if no batter is up", () => {
            var events: Array<GameEvent> = [];
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder().build();
            var sut = new SingleCommand(player);

            (function() { sut.do(events, state); }).should
                .throw("There is no batter at the plate.",
                "Game was allowed to record a single with no batter up.");
        });
    });

    describe("the single event", () => {
        it("should be of type Single", () => {
            var player = new PlayerBuilder().build();
            var sut = new SingleEvent(player);

            sut.type.should.equal(EventType.Single);
        });
    });
});
