import * as lodash from "lodash";
import { should, expect } from "chai";
import {
    AddToLineUpCommand, AddToLineUpEvent,
    DefensivePosition, GameEvent, GameState, EventType, LineUp, Player,
    RemoveFromLineUpCommand, RemoveFromLineUpEvent, Team
} from "../baseball";
import { addToLineUpEvolver } from "../baseball/aggregates/gamestate/addToLineUpEvolver";
import { removeFromLineUpEvolver } from "../baseball/aggregates/gamestate/removeFromLineUpEvolver";
import { GameStateBuilder, PlayerBuilder } from "./stateBuilder";

describe("LineUp", () => {
    describe("class", () => {
        it("allows you to add a player.", () => {
            var player = new Player("Bob Gibson", DefensivePosition.pitcher);
            var sut = new LineUp();

            sut.add(player, 1);
            var result = sut.getPosition(DefensivePosition.pitcher);

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("allows you to get a player by DefensivePosition.", () => {
            var player = new Player("Bob Gibson", DefensivePosition.pitcher);
            var sut = new LineUp();

            sut.add(player, 1);
            var result = sut.getPosition(DefensivePosition.pitcher);

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("allows you to get a player by spot in lineup.", () => {
            var player = new Player("Bob Gibson", DefensivePosition.pitcher);
            var sut = new LineUp();

            sut.add(player, 2);
            var result = sut.getSpot(2);

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("does not allow you to add a player if one already exists in the spot.", () => {
            var player1 = new Player("Ozzie Smith", DefensivePosition.shortStop);
            var player2 = new Player("Bob Gibson", DefensivePosition.pitcher);
            var sut = new LineUp();

            sut.add(player1, 2);

            (function() { sut.add(player2, 2); }).should
                .throw("That position in the line up is already occupied.");
        });
        it("does not allow you to add a player if one already exists in the position.", () => {
            var player1 = new Player("Cy Young", DefensivePosition.pitcher);
            var player2 = new Player("Bob Gibson", DefensivePosition.pitcher);
            var sut = new LineUp();

            sut.add(player1, 2);

            (function() { sut.add(player2, 3); }).should
                .throw("That position in the line up is already occupied.");
        });
        it("getting an empty position returns null.", () => {
            var sut = new LineUp();
            
            should().equal(sut.getSpot(1), null);
        });
        it("allows you to remove a player.", () => {
            var player = new Player("Bob Gibson", DefensivePosition.pitcher);
            var player1 = new Player("Bob Gibson", DefensivePosition.pitcher);
            var sut = new LineUp();

            sut.add(player, 2);
            sut.remove(player1);
            
            should().equal(sut.getSpot(2), null);
            should().equal(sut.getPosition(player.position), null);
        });
        it("allows you get batter.", () => {
            var player = new Player("Bob Gibson", DefensivePosition.pitcher);
            var sut = new LineUp();

            sut.add(player, 1);
            sut.nextBatter();
            var result = sut.getBatter();

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("allows you get on deck.", () => {
            var player = new Player("Bob Gibson", DefensivePosition.pitcher);
            var sut = new LineUp();

            sut.add(player, 2);
            sut.nextBatter();
            var result = sut.getOnDeck();

            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("allows you to move the lineup forward.", () => {
            var player1 = new Player("Bob Gibson", DefensivePosition.pitcher);
            var player2 = new Player("Lou Brock", DefensivePosition.leftField);
            var sut = new LineUp();

            sut.add(player1, 2);
            sut.add(player2, 3);
            sut.nextBatter();
            var onDeck = sut.getOnDeck();
            expect(onDeck).not.to.be.null;
            (<Player>onDeck).should.equal(player1);

            sut.nextBatter();
            var batter = sut.getBatter();
            onDeck = sut.getOnDeck();

            expect(batter).to.not.be.null;
            (<Player>batter).should.equal(player1);

            expect(onDeck).to.not.be.null;
            (<Player>onDeck).should.equal(player2);
        });
        it("restarts at the beginning of the lineup when it reaches the end.", () => {
            var player1 = new Player("Bob Gibson", DefensivePosition.pitcher);
            var player2 = new Player("Lou Brock", DefensivePosition.leftField);
            var sut = new LineUp();

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

            var batter = sut.getBatter();
            var onDeck = sut.getOnDeck();

            expect(batter).to.not.be.null;
            (<Player>batter).should.equal(player1);

            expect(onDeck).to.not.be.null;
            (<Player>onDeck).should.equal(player2);
        });
    });
    describe("add command", () => {
        it("adds AddPlayerToLineUp event.", () => {
            var player = new Player("Mike Shannon", DefensivePosition.catcher);
            var spot = 1;
            var team = Team.home;
            var sut = new AddToLineUpCommand(player, spot, team);
            var events: Array<GameEvent> = [];
            var state = new GameState();

            sut.do(events, state);

            events[0].type.should.equal(EventType.AddToLineUp);
        });
        it("added AddPlayerToLineUp event should contain the correct player and line up spot.", () => {
            var player = new Player("Mike Shannon", DefensivePosition.catcher);
            var spot = 1;
            var team = Team.home;
            var sut = new AddToLineUpCommand(player, spot, team);
            var events: Array<GameEvent> = [];
            var state = new GameState();

            sut.do(events, state);

            events[0].properties.player.should.equal(player);
            events[0].properties.spot.should.equal(spot);
        });
        it("added player event should specify which lineup.", () => {
            var player = new Player("Mike Shannon", DefensivePosition.catcher);
            var spot = 1;
            var team = Team.home;
            var sut = new AddToLineUpCommand(player, spot, team);
            var events: Array<GameEvent> = [];
            var state = new GameState();

            sut.do(events, state);

            events[0].properties.team.should.equal(team);
        });
        it("should validate a player isn't already at that position.", () => {
            var player1 = new Player("Mike Shannon", DefensivePosition.catcher);
            var lineUp = new LineUp();
            lineUp.add(player1, 2);

            var player2 = new Player("Yadi Molina", DefensivePosition.catcher);
            var spot = 1;
            var team = Team.home;
            var state = new GameStateBuilder().withHomeLineUp(lineUp).build();

            var sut = new AddToLineUpCommand(player2, spot, team);
            var events: Array<GameEvent> = [];

            (() => { sut.do(events, state); })
                .should.throw("That position in the line up is already occupied.");
        });
        it("should validate a player isn't already at that spot.", () => {
            var player1 = new Player("Mike Shannon", DefensivePosition.catcher);
            var lineUp = new LineUp();
            var spot = 1;
            lineUp.add(player1, spot);

            var player2 = new Player("Ozzie Smith", DefensivePosition.shortStop);
            var team = Team.visitor;
            var state = new GameStateBuilder().withVisitorLineUp(lineUp).build();

            var sut = new AddToLineUpCommand(player2, spot, team);
            var events: Array<GameEvent> = [];

            (() => { sut.do(events, state); })
                .should.throw("That position in the line up is already occupied.");
        });
    });
    describe("add event evolver", () => {
        it("adds player to visiting team lineup.", () => {
            var player = new PlayerBuilder().build();
            var event = new AddToLineUpEvent(player, 1, Team.visitor)
            var gameState = new GameStateBuilder().build();

            addToLineUpEvolver(event, gameState);

            var result = gameState.visitorLineUp.getSpot(1);
            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
        it("adds player to home team lineup.", () => {
            var player = new PlayerBuilder().build();
            var event = new AddToLineUpEvent(player, 1, Team.home)
            var gameState = new GameStateBuilder().build();

            addToLineUpEvolver(event, gameState);

            var result = gameState.homeLineUp.getSpot(1);
            expect(result).to.not.be.null;
            (<Player>result).should.equal(player);
        });
    });
    describe("remove command", () => {
        it("adds RemovePlayerFromLineUp event.", () => {
            var player = new Player("Mike Shannon", DefensivePosition.catcher);
            var team = Team.home;
            var sut = new RemoveFromLineUpCommand(player, team);
            var events: Array<GameEvent> = [];
            var state = new GameStateBuilder().build();

            sut.do(events, state);

            events[0].type.should.equal(EventType.RemoveFromLineUp);
        });
        it("added RemovePlayerFromLineUp event should contain the correct player.", () => {
            var player = new Player("Mike Shannon", DefensivePosition.catcher);
            var spot = 1;
            var team = Team.home;
            var sut = new RemoveFromLineUpCommand(player, team);
            var events: Array<GameEvent> = [];
            var state = new GameState();

            sut.do(events, state);

            events[0].properties.player.should.equal(player);
            events[0].properties.team.should.equal(team);
        });
    });
    describe("remove event evolver", () => {
        it("removes player from visiting team lineup.", () => {
            var player = new PlayerBuilder().build();
            var event = new RemoveFromLineUpEvent(player, Team.visitor);
            var lineUp = new LineUp();
            lineUp.add(player, 1);
            var gameState = new GameStateBuilder().withVisitorLineUp(lineUp).build();

            removeFromLineUpEvolver(event, gameState);

            var result = gameState.visitorLineUp.getSpot(1);
            expect(result).to.be.null;
        });
        it("removes player from home team lineup.", () => {
            var player = new PlayerBuilder().build();
            var event = new RemoveFromLineUpEvent(player, Team.home);
            var lineUp = new LineUp();
            lineUp.add(player, 1);
            var gameState = new GameStateBuilder().withHomeLineUp(lineUp).build();

            removeFromLineUpEvolver(event, gameState);

            var result = gameState.homeLineUp.getSpot(1);
            expect(result).to.be.null;
        });
    });
});
