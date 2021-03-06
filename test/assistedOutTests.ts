import * as _ from "lodash";
import {
    AssistedOutCommand, AssistedOutEvent, DefensivePosition, EventType, evolve,
    Player
} from "../baseball/index";
import { GameStateBuilder, PlayerBuilder } from "./stateBuilder";

describe("assisted out command", () => {
    it("adds assisted out event", () => {
        let defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        let outPlayer = new PlayerBuilder().build();
        let state = new GameStateBuilder().withAtBat(outPlayer).build();
        let sut = new AssistedOutCommand(defensivePlayers, [outPlayer]);

        let results = sut.do(state);

        _.findIndex(results, { "type": EventType.AssistedOut })
            .should.not.equal(-1, "Could not find a batter force out event.");
    });
    it("adds a list of defensive players to the event", () => {
        let defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        let outPlayer = new PlayerBuilder().build();
        let state = new GameStateBuilder().withAtBat(outPlayer).build();
        let sut = new AssistedOutCommand(defensivePlayers, [outPlayer]);

        let results = sut.do(state);

        let result = _.find(results, { "type": EventType.AssistedOut });
        result.should.be.an("object");
        (<AssistedOutEvent>result).properties.defensivePlayers[0].name.should.equal("Ozzie Smith");
        (<AssistedOutEvent>result).properties.defensivePlayers[1].name.should.equal("Tommy Herr");
        (<AssistedOutEvent>result).properties.defensivePlayers[2].name.should.equal("Jack Clark");
    });
    it("adds a list of offensive players that are out to the event", () => {
        let defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        let outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        let state = new GameStateBuilder().withAtBat(outPlayers[0]).build();
        let sut = new AssistedOutCommand(defensivePlayers, outPlayers);

        let results = sut.do(state);

        let result = _.find(results, { "type": EventType.AssistedOut });
        (<AssistedOutEvent>result).properties.outPlayers[0].name.should.equal("Bob Gibson");
        (<AssistedOutEvent>result).properties.outPlayers[1].name.should.equal("Tim McCarver");
    });
    it("runs super.do for each player that is out", () => {
        let defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        let outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        let state = new GameStateBuilder().withAtBat(outPlayers[0]).build();
        let sut = new AssistedOutCommand(defensivePlayers, outPlayers);

        let results = sut.do(state);

        let result = _.filter(results, { "type": EventType.Out });
        result.length.should.equal(2);
    });
    it("throws an error if no one is at bat", () => {
        let defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        let outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        let state = new GameStateBuilder().build();
        let sut = new AssistedOutCommand(defensivePlayers, outPlayers);

        (function() { sut.do(state); }).should
            .throw("There is no batter at the plate.",
                "Assisted out was allowed without a batter.");
    });
    it("throws an error if less than two defensive players are submitted", () => {
        let outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        let state = new GameStateBuilder().withAtBat(outPlayers[0]).build();
        let sut = new AssistedOutCommand([], outPlayers);

        (function() { sut.do(state); }).should
            .throw("An assisted out requires two defensive players.",
                "Assisted out was allowed without two defensive players.");
    });
    it("throws an error if less than two defensive players are submitted", () => {
        let batter = new PlayerBuilder().build();
        let defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        let state = new GameStateBuilder().withAtBat(batter).build();
        let sut = new AssistedOutCommand(defensivePlayers, []);

        (function() { sut.do(state); }).should
            .throw("An assisted out requires at least one player who is out to be supplied.",
                "Assisted out was allowed without the player who is out.");
    });
});

describe("assisted out event", () => {
    it("should be of type Out", () => {
        let defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        let outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        let sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        sut.type.should.equal(EventType.AssistedOut);
    });
    it("should remove the out players from state.", () => {
        let defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Terry Pendleton")
                .withPosition(DefensivePosition.thirdBase).build(),
            new PlayerBuilder().withName("Jose Oquendo")
                .withPosition(DefensivePosition.leftField).build()
        ];
        let outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build(),
            new PlayerBuilder().withName("Mike Shannon")
                .withPosition(DefensivePosition.catcher).build()
        ];
        let state = new GameStateBuilder()
            .withAtBat(outPlayers[0])
            .withFirstBasePlayers([outPlayers[1]])
            .withSecondBasePlayers([outPlayers[2]])
            .build();

        let sut = new AssistedOutEvent(defensivePlayers, outPlayers);
        evolve(sut, state);

        state.should.have.property("atBat")
            .equal(null, "The runner is still at the offensive position.");
        state.firstBase.length.should.equal(0, "The player was not removed from first base");
        state.secondBase.length.should.equal(0, "The player was not removed from second base.");
    });
});
