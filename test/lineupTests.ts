import { expect } from "chai";
import {
    AddToLineUpCommand, AddToLineUpEvent,
    DefensivePosition, EventType, GameState, LineUp, Player,
    RemoveFromLineUpCommand, RemoveFromLineUpEvent, Team
} from "../baseball";
import { addToLineUpEvolver } from "../baseball/aggregates/gameState/addToLineUpEvolver";
import { removeFromLineUpEvolver } from "../baseball/aggregates/gameState/removeFromLineUpEvolver";
import { GameStateBuilder, PlayerBuilder } from "./stateBuilder";

describe("LineUp", () => {
    describe("class", () => {
        it("allows you to add a player.", () => {
            let player = new Player("Bob Gibson", DefensivePosition.pitcher);
            let sut = new LineUp();

            sut.add(player, 1);
            let result = sut.getPosition(DefensivePosition.pitcher);

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("allows you to get a player by DefensivePosition.", () => {
            let player = new Player("Bob Gibson", DefensivePosition.pitcher);
            let sut = new LineUp();

            sut.add(player, 1);
            let result = sut.getPosition(DefensivePosition.pitcher);

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("allows you to get a player by spot in lineup.", () => {
            let player = new Player("Bob Gibson", DefensivePosition.pitcher);
            let sut = new LineUp();

            sut.add(player, 2);
            let result = sut.getSpot(2);

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("does not allow you to add a player if one already exists in the spot.", () => {
            let player1 = new Player("Ozzie Smith", DefensivePosition.shortStop);
            let player2 = new Player("Bob Gibson", DefensivePosition.pitcher);
            let sut = new LineUp();

            sut.add(player1, 2);

            (function() { sut.add(player2, 2); }).should
                .throw("That position in the line up is already occupied.");
        });
        it("does not allow you to add a player if one already exists in the position.", () => {
            let player1 = new Player("Cy Young", DefensivePosition.pitcher);
            let player2 = new Player("Bob Gibson", DefensivePosition.pitcher);
            let sut = new LineUp();

            sut.add(player1, 2);

            (function() { sut.add(player2, 3); }).should
                .throw("That position in the line up is already occupied.");
        });
        it("getting an empty position returns null.", () => {
            let sut = new LineUp();

            expect(sut.getSpot(1)).to.be.null;
        });
        it("allows you to remove a player.", () => {
            let player = new Player("Bob Gibson", DefensivePosition.pitcher);
            let player1 = new Player("Bob Gibson", DefensivePosition.pitcher);
            let sut = new LineUp();

            sut.add(player, 2);
            sut.remove(player1);

            expect(sut.getSpot(2)).to.be.null;
            expect(sut.getPosition(player.position)).to.be.null;
        });
        it("allows you get batter.", () => {
            let player = new Player("Bob Gibson", DefensivePosition.pitcher);
            let sut = new LineUp();

            sut.add(player, 1);
            sut.nextBatter();
            let result = sut.getBatter();

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("allows you get on deck.", () => {
            let player = new Player("Bob Gibson", DefensivePosition.pitcher);
            let sut = new LineUp();

            sut.add(player, 2);
            sut.nextBatter();
            let result = sut.getOnDeck();

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("allows you to move the lineup forward.", () => {
            let player1 = new Player("Bob Gibson", DefensivePosition.pitcher);
            let player2 = new Player("Lou Brock", DefensivePosition.leftField);
            let sut = new LineUp();

            sut.add(player1, 2);
            sut.add(player2, 3);
            sut.nextBatter();
            let onDeck = sut.getOnDeck();
            expect(onDeck).not.to.be.null;
            (<Player>onDeck).should.equal(player1);

            sut.nextBatter();
            let batter = sut.getBatter();
            onDeck = sut.getOnDeck();

            expect(batter).to.not.be.null;
            (<Player>batter).should.equal(player1);

            expect(onDeck).to.not.be.null;
            (<Player>onDeck).should.equal(player2);
        });
        it("restarts at the beginning of the lineup when it reaches the end.", () => {
            let player1 = new Player("Bob Gibson", DefensivePosition.pitcher);
            let player2 = new Player("Lou Brock", DefensivePosition.leftField);
            let sut = new LineUp();

            sut.add(player1, 1);
            sut.add(player2, 2);

            sut.nextBatter();
            sut.nextBatter();
            sut.nextBatter();
            sut.nextBatter();
            sut.nextBatter();
            sut.nextBatter();
            sut.nextBatter();
            sut.nextBatter();
            sut.nextBatter();
            sut.nextBatter();

            let batter = sut.getBatter();
            let onDeck = sut.getOnDeck();

            expect(batter).to.not.be.null;
            (<Player>batter).should.equal(player1);

            expect(onDeck).to.not.be.null;
            (<Player>onDeck).should.equal(player2);
        });
    });
    describe("add command", () => {
        it("adds AddPlayerToLineUp event.", () => {
            let player = new Player("Mike Shannon", DefensivePosition.catcher);
            let spot = 1;
            let team = Team.home;
            let sut = new AddToLineUpCommand(player, spot, team);
            let state = new GameState();

            let results = sut.do(state);

            results[0].type.should.equal(EventType.AddToLineUp);
        });
        it("added AddPlayerToLineUp event should contain the correct player and line up spot.", () => {
            let player = new Player("Mike Shannon", DefensivePosition.catcher);
            let spot = 1;
            let team = Team.home;
            let sut = new AddToLineUpCommand(player, spot, team);
            let state = new GameState();

            let results = sut.do(state);

            results[0].properties.player.should.equal(player);
            results[0].properties.spot.should.equal(spot);
        });
        it("added player event should specify which lineup.", () => {
            let player = new Player("Mike Shannon", DefensivePosition.catcher);
            let spot = 1;
            let team = Team.home;
            let sut = new AddToLineUpCommand(player, spot, team);
            let state = new GameState();

            let results = sut.do(state);

            results[0].properties.team.should.equal(team);
        });
        it("should validate a player isn't already at that position.", () => {
            let player1 = new Player("Mike Shannon", DefensivePosition.catcher);
            let lineUp = new LineUp();
            lineUp.add(player1, 2);

            let player2 = new Player("Yadi Molina", DefensivePosition.catcher);
            let spot = 1;
            let team = Team.home;
            let state = new GameStateBuilder().withHomeLineUp(lineUp).build();

            let sut = new AddToLineUpCommand(player2, spot, team);

            (() => { sut.do(state); })
                .should.throw("That position in the line up is already occupied.");
        });
        it("should validate a player isn't already at that spot.", () => {
            let player1 = new Player("Mike Shannon", DefensivePosition.catcher);
            let lineUp = new LineUp();
            let spot = 1;
            lineUp.add(player1, spot);

            let player2 = new Player("Ozzie Smith", DefensivePosition.shortStop);
            let team = Team.visitor;
            let state = new GameStateBuilder().withVisitorLineUp(lineUp).build();

            let sut = new AddToLineUpCommand(player2, spot, team);

            (() => { sut.do(state); })
                .should.throw("That position in the line up is already occupied.");
        });
    });
    describe("add event evolver", () => {
        it("adds player to visiting team lineup.", () => {
            let player = new PlayerBuilder().build();
            let event = new AddToLineUpEvent(player, 1, Team.visitor);
            let gameState = new GameStateBuilder().build();

            addToLineUpEvolver(event, gameState);

            let result = gameState.visitorLineUp.getSpot(1);
            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("adds player to home team lineup.", () => {
            let player = new PlayerBuilder().build();
            let event = new AddToLineUpEvent(player, 1, Team.home);
            let gameState = new GameStateBuilder().build();

            addToLineUpEvolver(event, gameState);

            let result = gameState.homeLineUp.getSpot(1);
            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
    });
    describe("remove command", () => {
        it("adds RemovePlayerFromLineUp event.", () => {
            let player = new Player("Mike Shannon", DefensivePosition.catcher);
            let team = Team.home;
            let sut = new RemoveFromLineUpCommand(player, team);
            let state = new GameStateBuilder().build();

            let results = sut.do(state);

            results[0].type.should.equal(EventType.RemoveFromLineUp);
        });
        it("added RemovePlayerFromLineUp event should contain the correct player.", () => {
            let player = new Player("Mike Shannon", DefensivePosition.catcher);
            let team = Team.home;
            let sut = new RemoveFromLineUpCommand(player, team);
            let state = new GameState();

            let results = sut.do(state);

            results[0].properties.player.should.equal(player);
            results[0].properties.team.should.equal(team);
        });
    });
    describe("remove event evolver", () => {
        it("removes player from visiting team lineup.", () => {
            let player = new PlayerBuilder().build();
            let event = new RemoveFromLineUpEvent(player, Team.visitor);
            let lineUp = new LineUp();
            lineUp.add(player, 1);
            let gameState = new GameStateBuilder().withVisitorLineUp(lineUp).build();

            removeFromLineUpEvolver(event, gameState);

            let result = gameState.visitorLineUp.getSpot(1);
            expect(result).to.be.null;
        });
        it("removes player from home team lineup.", () => {
            let player = new PlayerBuilder().build();
            let event = new RemoveFromLineUpEvent(player, Team.home);
            let lineUp = new LineUp();
            lineUp.add(player, 1);
            let gameState = new GameStateBuilder().withHomeLineUp(lineUp).build();

            removeFromLineUpEvolver(event, gameState);

            let result = gameState.homeLineUp.getSpot(1);
            expect(result).to.be.null;
        });
    });
});
