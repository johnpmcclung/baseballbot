import * as lodash from "lodash";
import {
    EventType, HomerunCommand, HomerunEvent, InningHalf, Team
} from "../baseball/index";
import { PlayerBuilder, GameStateBuilder } from "./stateBuilder";

describe("homerun", () => {
    describe("the homerun command", () => {
        it("adds a homerun event", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .build();
            var sut = new HomerunCommand(player);

            let results = sut.do(state);
            lodash.findIndex(results, {type: EventType.Homerun})
                .should.not.equal(-1, "Could not find a homerun event.");
        });
        it("adds a run scored event for the visiting team in the top of the inning", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .build();
            var sut = new HomerunCommand(player);

            let results = sut.do(state);

            lodash.findIndex(results, {type: EventType.RunScored, properties: { team: Team.visitor }})
                .should.not.equal(-1, "Could not find a run scored event for the visiting team.");
        });
        it("adds a run scored event for the home team in the bottom of the inning", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withInningHalf(InningHalf.bottom)
                .build();
            var sut = new HomerunCommand(player);

            let results = sut.do(state);

            lodash.findIndex(results, {type: EventType.RunScored, properties: { team: Team.home }})
                .should.not.equal(-1, "Could not find a run scored event for the visiting team.");
        });
        it("fails if the game is already over", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withGameOver(true)
                .build();
            var sut = new HomerunCommand(player);

            (function() { sut.do(state); }).should
                .throw("Game has already finished.", "Game was allowed to start a finished game.");
        });
        it("throws an error if the game is not started", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withStarted(false)
                .build();
            var sut = new HomerunCommand(player);

            (function() { sut.do(state); }).should
                .throw("Game has not started.",
                "Game was allowed to record a homerun before starting.");
        });
        it("throws an error if no batter is up", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder().build();
            var sut = new HomerunCommand(player);

            (function() { sut.do(state); }).should
                .throw("There is no batter at the plate.",
                "Game was allowed to record a homerun with no batter up.");
        });
    });

    describe("the homerun event", () => {
        it("should be of type Homerun", () => {
            var player = new PlayerBuilder().build();
            var sut = new HomerunEvent(player);

            sut.type.should.equal(EventType.Homerun);
        });
    });
});
