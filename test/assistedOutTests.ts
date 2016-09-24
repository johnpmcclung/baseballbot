import * as chai from "chai";
import * as lodash from "lodash";
import {
    AssistedOutCommand, AssistedOutEvent, assistedOutEventStringify, DefensivePosition, EventType, evolve, 
    GameEvent, GameState, InningHalf, Player
} from "../baseball/index";
import { GameStateBuilder, PlayerBuilder } from "./stateBuilder";

describe("assisted out command", () => {
    it("adds assisted out event", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        var events: Array<GameEvent> = [];
        var outPlayer = new PlayerBuilder().build();
        var state = new GameStateBuilder().withAtBat(outPlayer).build();
        var sut = new AssistedOutCommand(defensivePlayers, [outPlayer]);

        sut.do(events, state);

        lodash.findIndex(events, { type: EventType.AssistedOut })
            .should.not.equal(-1, "Could not find a batter force out event.");
    });
    it("adds a list of defensive players to the event", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        var events: Array<GameEvent> = [];
        var outPlayer = new PlayerBuilder().build();
        var state = new GameStateBuilder().withAtBat(outPlayer).build();
        var sut = new AssistedOutCommand(defensivePlayers, [outPlayer]);

        sut.do(events, state);

        var result = lodash.find(events, { type: EventType.AssistedOut });
        result.should.be.an("object");
        (<AssistedOutEvent>result).properties.defensivePlayers[0].name.should.equal("Ozzie Smith");
        (<AssistedOutEvent>result).properties.defensivePlayers[1].name.should.equal("Tommy Herr");
        (<AssistedOutEvent>result).properties.defensivePlayers[2].name.should.equal("Jack Clark");
    });
    it("adds a list of offensive players that are out to the event", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        var events: Array<GameEvent> = [];
        var state = new GameStateBuilder().withAtBat(outPlayers[0]).build();
        var sut = new AssistedOutCommand(defensivePlayers, outPlayers);

        sut.do(events, state);

        var result = lodash.find(events, { type: EventType.AssistedOut });
        (<AssistedOutEvent>result).properties.outPlayers[0].name.should.equal("Bob Gibson");
        (<AssistedOutEvent>result).properties.outPlayers[1].name.should.equal("Tim McCarver");
    });
    it("runs super.do for each player that is out", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        var events: Array<GameEvent> = [];
        var state = new GameStateBuilder().withAtBat(outPlayers[0]).build();
        var sut = new AssistedOutCommand(defensivePlayers, outPlayers);

        sut.do(events, state);

        var result = lodash.filter(events, { type: EventType.Out });
        result.length.should.equal(2);
    });
    it("throws an error if no one is at bat", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        var events: Array<GameEvent> = [];
        var state = new GameStateBuilder().build();
        var sut = new AssistedOutCommand(defensivePlayers, outPlayers);

        (function() { sut.do(events, state); }).should
            .throw("There is no batter at the plate.",
                "Assisted out was allowed without a batter.");
    });
    it("throws an error if less than two defensive players are submitted", () => {
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        var events: Array<GameEvent> = [];
        var state = new GameStateBuilder().withAtBat(outPlayers[0]).build();
        var sut = new AssistedOutCommand([], outPlayers);

        (function() { sut.do(events, state); }).should
            .throw("An assisted out requires two defensive players.",
                "Assisted out was allowed without two defensive players.");
    });
    it("throws an error if less than two defensive players are submitted", () => {
        var batter = new PlayerBuilder().build();
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        var events: Array<GameEvent> = [];
        var state = new GameStateBuilder().withAtBat(batter).build();
        var sut = new AssistedOutCommand(defensivePlayers, []);

        (function() { sut.do(events, state); }).should
            .throw("An assisted out requires at least one player who is out to be supplied.",
                "Assisted out was allowed without the player who is out.");
    });
});

describe("assisted out event", () => {
    it("should be of type Out", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Jack Clark")
                .withPosition(DefensivePosition.firstBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];
        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        sut.type.should.equal(EventType.AssistedOut);
    });
    it("should return a string describing itself (1 out, 2 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name} is out. (${defensivePlayers[0].position}-${defensivePlayers[1].position})`
        );
    });
    it("should return a string describing itself (2 out, 2 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name} and ${outPlayers[1].name} are out. (${defensivePlayers[0].position}-${defensivePlayers[1].position})`
        );
    });
    it("should return a string describing itself (3 out, 2 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build(),
            new PlayerBuilder().withName("Mike Shannon")
                .withPosition(DefensivePosition.catcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name}, ${outPlayers[1].name}, and ${outPlayers[2].name} are out. ` +
            `(${defensivePlayers[0].position}-${defensivePlayers[1].position})`
        );
    });
    it("should return a string describing itself (1 out, 3 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Terry Pendleton")
                .withPosition(DefensivePosition.thirdBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name} is out. (${defensivePlayers[0].position}-${defensivePlayers[1].position}` +
            `-${defensivePlayers[2].position})`
        );
    });
    it("should return a string describing itself (2 out, 3 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Terry Pendleton")
                .withPosition(DefensivePosition.thirdBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name} and ${outPlayers[1].name} are out. (${defensivePlayers[0].position}-` +
            `${defensivePlayers[1].position}-${defensivePlayers[2].position})`
        );
    });
    it("should return a string describing itself (3 out, 3 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Terry Pendleton")
                .withPosition(DefensivePosition.thirdBase).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build(),
            new PlayerBuilder().withName("Mike Shannon")
                .withPosition(DefensivePosition.catcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name}, ${outPlayers[1].name}, and ${outPlayers[2].name} are out. ` +
            `(${defensivePlayers[0].position}-${defensivePlayers[1].position}-${defensivePlayers[2].position})`
        );
    });
    it("should return a string describing itself (1 out, 4 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Terry Pendleton")
                .withPosition(DefensivePosition.thirdBase).build(),
            new PlayerBuilder().withName("Jose Oquendo")
                .withPosition(DefensivePosition.leftField).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name} is out. (${defensivePlayers[0].position}-${defensivePlayers[1].position}` +
            `-${defensivePlayers[2].position}-${defensivePlayers[3].position})`
        );
    });
    it("should return a string describing itself (2 out, 4 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Terry Pendleton")
                .withPosition(DefensivePosition.thirdBase).build(),
            new PlayerBuilder().withName("Jose Oquendo")
                .withPosition(DefensivePosition.leftField).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name} and ${outPlayers[1].name} are out. (${defensivePlayers[0].position}-` +
            `${defensivePlayers[1].position}-${defensivePlayers[2].position}-${defensivePlayers[3].position})`
        );
    });
    it("should return a string describing itself (3 out, 4 defensive players)", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Terry Pendleton")
                .withPosition(DefensivePosition.thirdBase).build(),
            new PlayerBuilder().withName("Jose Oquendo")
                .withPosition(DefensivePosition.leftField).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build(),
            new PlayerBuilder().withName("Mike Shannon")
                .withPosition(DefensivePosition.catcher).build()
        ];

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);

        var result = assistedOutEventStringify(sut);

        result.should.be.equal(
            `${outPlayers[0].name}, ${outPlayers[1].name}, and ${outPlayers[2].name} are out. ` +
            `(${defensivePlayers[0].position}-${defensivePlayers[1].position}-${defensivePlayers[2].position}` +
            `-${defensivePlayers[3].position})`
        );
    });
    it("should remove the out players from state.", () => {
        var defensivePlayers: Player[] = [
            new PlayerBuilder().withName("Ozzie Smith")
                .withPosition(DefensivePosition.shortStop).build(),
            new PlayerBuilder().withName("Tommy Herr")
                .withPosition(DefensivePosition.secondBase).build(),
            new PlayerBuilder().withName("Terry Pendleton")
                .withPosition(DefensivePosition.thirdBase).build(),
            new PlayerBuilder().withName("Jose Oquendo")
                .withPosition(DefensivePosition.leftField).build()
        ];
        var outPlayers: Player[] = [
            new PlayerBuilder().withName("Bob Gibson")
                .withPosition(DefensivePosition.pitcher).build(),
            new PlayerBuilder().withName("Tim McCarver")
                .withPosition(DefensivePosition.catcher).build(),
            new PlayerBuilder().withName("Mike Shannon")
                .withPosition(DefensivePosition.catcher).build()
        ];
        var state = new GameStateBuilder()
            .withAtBat(outPlayers[0])
            .withFirstBasePlayers([outPlayers[1]])
            .withSecondBasePlayers([outPlayers[2]])
            .build();

        var sut = new AssistedOutEvent(defensivePlayers, outPlayers);
        evolve(sut, state);

        state.should.have.property("atBat")
            .equal(null, "The runner is still at the offensive position.");
        state.firstBase.length.should.equal(0, "The player was not removed from first base");
        state.secondBase.length.should.equal(0, "The player was not removed from second base.");
    });
});
