import * as lodash from "lodash";
import {
    EventType, SingleCommand, SingleEvent
} from "../baseball/index";
import { GameStateBuilder, PlayerBuilder } from "./stateBuilder";

describe("single", () => {
    describe("the single command", () => {
        it("creates a single event", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder().withAtBat(player).build();
            let sut = new SingleCommand(player);

            let results = sut.do(state);

            lodash.findIndex(results, { "type": EventType.Single })
                .should.not.equal(-1, "Could not find single event.");
        });
        it("fails if the game is already over", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder()
                .withAtBat(player)
                .withGameOver(true)
                .build();
            let sut = new SingleCommand(player);

            (function() { sut.do(state); }).should
                .throw("Game has already finished.",
                "Finished game was allowed to have a single.");
        });
        it("throws an error if the game is not started", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder()
                .withAtBat(player)
                .withStarted(false)
                .build();
            let sut = new SingleCommand(player);

            (function() { sut.do(state); }).should
                .throw("Game has not started.",
                "Unstarted game was allowed to have a single.");
        });
        it("throws an error if no batter is up", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder().build();
            let sut = new SingleCommand(player);

            (function() { sut.do(state); }).should
                .throw("There is no batter at the plate.",
                "Game was allowed to record a single with no batter up.");
        });
    });

    describe("the single event", () => {
        it("should be of type Single", () => {
            let player = new PlayerBuilder().build();
            let sut = new SingleEvent(player);

            sut.type.should.equal(EventType.Single);
        });
    });
});
