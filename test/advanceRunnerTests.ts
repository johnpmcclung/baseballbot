import * as lodash from "lodash";
import {
    AdvanceRunnerCommand, AdvanceRunnerEvent, EventType, evolve,
    GameState, InningHalf, OffensivePosition, Team
} from "../baseball/index";
import { PlayerBuilder, GameStateBuilder } from "./stateBuilder";

describe("runner advances", () => {
    describe("advance runner command", () => {
        it("adds a advance runner event", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder().withAtBat(player).build();
            var sut = new AdvanceRunnerCommand(OffensivePosition.second, player);

            let results = sut.do(state);

            lodash.findIndex(results, { type: EventType.AdvanceRunner })
                .should.not.equal(-1, "Could not find an advance runner event.");
        });
        it("throws an error if the game is not started", () => {
            var player = new PlayerBuilder().build();
            var state = new GameState();
            var sut = new AdvanceRunnerCommand(OffensivePosition.second, player);

            (function() { sut.do(state); }).should
                .throw("Game has not started.");
        });
        it("fails if the game is already over", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder().withGameOver(true).build();
            var sut = new AdvanceRunnerCommand(OffensivePosition.second, player);

            (function() { sut.do(state); }).should
                .throw("Game has already finished.");
        });
        describe("runner from first to second", () => {
            it("should add an advance runner event with player, starting base, and ending base", () => {
                var player = new PlayerBuilder().build();
                var state = new GameStateBuilder().withFirstBasePlayers([player]).build();
                var sut = new AdvanceRunnerCommand(OffensivePosition.second, player);

                let results = sut.do(state);

                lodash.findIndex(results, {
                    type: EventType.AdvanceRunner,
                    properties: {
                        player: player,
                        from: OffensivePosition.first,
                        to: OffensivePosition.second
                    }
                }).should.not.equal(-1, "Could not find an advance runner event.");
            });
        });
        describe("runner from second to third", () => {
            it("should add an advance runner event with player, starting base, and ending base", () => {
                var player = new PlayerBuilder().build();
                var state = new GameStateBuilder().withSecondBasePlayers([player]).build();
                var sut = new AdvanceRunnerCommand(OffensivePosition.third, player);

                let results = sut.do(state);

                lodash.findIndex(results, {
                    type: EventType.AdvanceRunner,
                    properties: {
                        player: player,
                        from: OffensivePosition.second,
                        to: OffensivePosition.third
                    }
                }).should.not.equal(-1, "Could not find an advance runner event.");
            });
        });
        describe("runner from at bat to first", () => {
            it("should add an advance runner event with player, starting base, and ending base", () => {
                var player = new PlayerBuilder().build();
                var state = new GameStateBuilder().withAtBat(player).build();
                var sut = new AdvanceRunnerCommand(OffensivePosition.first, player);

                let results = sut.do(state);

                lodash.findIndex(results, {
                    type: EventType.AdvanceRunner,
                    properties: {
                        player: player,
                        from: OffensivePosition.atBat,
                        to: OffensivePosition.first
                    }
                }).should.not.equal(-1, "Could not find an advance runner event.");
            });
        });
        describe("runner from at bat to home", () => {
            it("should add an advance runner event with player, starting base, and ending base", () => {
                var player = new PlayerBuilder().build();
                var state = new GameStateBuilder().withAtBat(player).build();
                var sut = new AdvanceRunnerCommand(OffensivePosition.home, player);

                let results = sut.do(state);

                lodash.findIndex(results, {
                    type: EventType.AdvanceRunner,
                    properties: {
                        player: player,
                        from: OffensivePosition.atBat,
                        to: OffensivePosition.home
                    }
                }).should.not.equal(-1, "Could not find an advance runner event.");
            });
        });
        describe("runner from third to home", () => {
            it("should add an advance runner event with player, starting base, and ending base", () => {
                var player = new PlayerBuilder().build();
                var state = new GameStateBuilder().withThirdBasePlayers([player]).build();
                var sut = new AdvanceRunnerCommand(OffensivePosition.home, player);

                let results = sut.do(state);

                lodash.findIndex(results, {
                    type: EventType.AdvanceRunner,
                    properties: {
                        player: player,
                        from: OffensivePosition.third,
                        to: OffensivePosition.home
                    }
                }).should.not.equal(-1, "Could not find an advance runner event.");
            });
            it("should add run scored event for the visitors if in top of the inning", () => {
                var player = new PlayerBuilder().build();
                var state = new GameStateBuilder()
                    .withThirdBasePlayers([player])
                    .build();
                var sut = new AdvanceRunnerCommand(OffensivePosition.home, player);

                let results = sut.do(state);

                lodash.findIndex(results, { type: EventType.RunScored, properties: {team: Team.visitor }})
                    .should.not.equal(-1, "Could not find a run scored event.");
            });
            it("should add run scored event for the home team if in bottom of the inning", () => {
                var player = new PlayerBuilder().build();
                var state = new GameStateBuilder()
                    .withThirdBasePlayers([player])
                    .withInningHalf(InningHalf.bottom)
                    .build();
                var sut = new AdvanceRunnerCommand(OffensivePosition.home, player);

                let results = sut.do(state);

                lodash.findIndex(results, { type: EventType.RunScored, properties: {team: Team.home }})
                    .should.not.equal(-1, "Could not find a run scored event.");
            });
        });
        it("should not allow a runner to move backwards", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withThirdBasePlayers([player])
                .withInningHalf(InningHalf.bottom)
                .build();
            var sut = new AdvanceRunnerCommand(OffensivePosition.second, player);

            (function() { sut.do(state); }).should
                .throw("Runner are not allowed to move backwards.");
        });
        it("should assume the batter is the runner if a runner isn't provided", () => {
            var player = new PlayerBuilder().build();
            var state = new GameStateBuilder()
                .withAtBat(player)
                .withInningHalf(InningHalf.bottom)
                .build();
            var sut = new AdvanceRunnerCommand(OffensivePosition.second, null);

            let results = sut.do(state);

            lodash.findIndex(results, {
                type: EventType.AdvanceRunner,
                properties: {
                    player: player,
                    from: OffensivePosition.atBat,
                    to: OffensivePosition.second
                }
            }).should.not.equal(-1, "Could not find an advance runner event.");
        });
    });

    describe("the advance runner event", () => {
        it("should be of type AdvanceRunner", () => {
            var player = new PlayerBuilder().build();
            var sut = new AdvanceRunnerEvent(player, OffensivePosition.first, OffensivePosition.second);

            sut.type.should.equal(EventType.AdvanceRunner);
        });
        it("should take runner out of from first if that is from", () => {
            var player = new PlayerBuilder().build();
            var state = new GameState();
            state.firstBase.push(player);
            var sut = new AdvanceRunnerEvent(player, OffensivePosition.first, OffensivePosition.second);

            evolve(sut, state);

            state.firstBase.indexOf(player)
                .should.be.equal(-1, "The runner is still at the offensive position.");
        });
        it("should take runner out of from second if that is from", () => {
            var player = new PlayerBuilder().build();
            var state = new GameState();
            state.secondBase.push(player);
            var sut = new AdvanceRunnerEvent(player, OffensivePosition.second, OffensivePosition.third);

            evolve(sut, state);

            state.secondBase.indexOf(player)
                .should.be.equal(-1, "The runner is still at the offensive position.");
        });
        it("should take runner out of from at bat if that is from", () => {
            var player = new PlayerBuilder().build();
            var state = new GameState();
            state.atBat = player;
            var sut = new AdvanceRunnerEvent(player, OffensivePosition.atBat, OffensivePosition.first);

            evolve(sut, state);

            state.should.have.property("atBat")
                .equal(null, "The runner is still at the offensive position.");
        });
        it("should take runner out of from third if that is from", () => {
            var player = new PlayerBuilder().build();
            var state = new GameState();
            state.thirdBase.push(player);
            var sut = new AdvanceRunnerEvent(player, OffensivePosition.third, OffensivePosition.home);

            evolve(sut, state);

            state.thirdBase.indexOf(player)
                .should.be.equal(-1, "The runner is still at the offensive position.");
        });
        it("should add runner to first if that is to", () => {
            var player = new PlayerBuilder().build();
            var state = new GameState();
            state.atBat = player;
            var sut = new AdvanceRunnerEvent(player, OffensivePosition.atBat, OffensivePosition.first);

            evolve(sut, state);

            state.firstBase.indexOf(player)
                .should.be.equal(0, "The runner is not at the new offensive position.");
        });
        it("should add runner to second if that is to", () => {
            var player = new PlayerBuilder().build();
            var state = new GameState();
            state.firstBase.push(player);
            var sut = new AdvanceRunnerEvent(player, OffensivePosition.first, OffensivePosition.second);

            evolve(sut, state);

            state.secondBase.indexOf(player)
                .should.be.equal(0, "The runner is not at the new offensive position.");
        });
        it("should add runner to first if that is to", () => {
            var player = new PlayerBuilder().build();
            var state = new GameState();
            state.secondBase.push(player);
            var sut = new AdvanceRunnerEvent(player, OffensivePosition.second, OffensivePosition.third);

            evolve(sut, state);

            state.thirdBase.indexOf(player)
                .should.be.equal(0, "The runner is not at the new offensive position.");
        });
    });
});
