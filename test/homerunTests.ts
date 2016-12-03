import * as lodash from "lodash";
import {
    EventType, HomerunCommand, HomerunEvent, InningHalf, Team
} from "../baseball/index";
import { GameStateBuilder, PlayerBuilder } from "./stateBuilder";

describe("homerun", () => {
    describe("the homerun command", () => {
        it("adds a homerun event", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder()
                .withAtBat(player)
                .build();
            let sut = new HomerunCommand(player);

            let results = sut.do(state);
            lodash.findIndex(results, { "type": EventType.Homerun })
                .should.not.equal(-1, "Could not find a homerun event.");
        });
        it("adds a run scored event for the visiting team in the top of the inning", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder()
                .withAtBat(player)
                .build();
            let sut = new HomerunCommand(player);

            let results = sut.do(state);

            lodash.findIndex(results, { "type": EventType.RunScored, "properties": { "team": Team.visitor } })
                .should.not.equal(-1, "Could not find a run scored event for the visiting team.");
        });
        it("adds a run scored event for the home team in the bottom of the inning", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder()
                .withAtBat(player)
                .withInningHalf(InningHalf.bottom)
                .build();
            let sut = new HomerunCommand(player);

            let results = sut.do(state);

            lodash.findIndex(results, { "type": EventType.RunScored, "properties": { "team": Team.home } })
                .should.not.equal(-1, "Could not find a run scored event for the visiting team.");
        });
        it("fails if the game is already over", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder()
                .withAtBat(player)
                .withGameOver(true)
                .build();
            let sut = new HomerunCommand(player);

            (function() { sut.do(state); }).should
                .throw("Game has already finished.", "Game was allowed to start a finished game.");
        });
        it("throws an error if the game is not started", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder()
                .withAtBat(player)
                .withStarted(false)
                .build();
            let sut = new HomerunCommand(player);

            (function() { sut.do(state); }).should
                .throw("Game has not started.",
                "Game was allowed to record a homerun before starting.");
        });
        it("throws an error if no batter is up", () => {
            let player = new PlayerBuilder().build();
            let state = new GameStateBuilder().build();
            let sut = new HomerunCommand(player);

            (function() { sut.do(state); }).should
                .throw("There is no batter at the plate.",
                "Game was allowed to record a homerun with no batter up.");
        });
    });

    describe("the homerun event", () => {
        it("should be of type Homerun", () => {
            let player = new PlayerBuilder().build();
            let sut = new HomerunEvent(player);

            sut.type.should.equal(EventType.Homerun);
        });
    });
});
