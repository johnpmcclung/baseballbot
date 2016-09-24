import { should } from "chai";
import {
    DefensivePosition, LineUp, Player
} from "../baseball/index";

describe("LineUp", () => {
    it("allows you to add a player.", () => {
        var player = new Player("Bob Gibson", DefensivePosition.pitcher);
        var sut = new LineUp();

        sut.add(player, 1);

        sut.getPosition(DefensivePosition.pitcher).should.equal(player);
    });
    it("allows you to get a player by DefensivePosition.", () => {
        var player = new Player("Bob Gibson", DefensivePosition.pitcher);
        var sut = new LineUp();

        sut.add(player, 1);

        sut.getPosition(DefensivePosition.pitcher).should.equal(player);
    });
    it("allows you to get a player by spot in lineup.", () => {
        var player = new Player("Bob Gibson", DefensivePosition.pitcher);
        var sut = new LineUp();

        sut.add(player, 2);

        sut.getSpot(2).should.equal(player);
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
        var sut = new LineUp();

        sut.add(player, 2);
        sut.remove(player);
        
        should().equal(sut.getSpot(2), null);
    });
    it("allows you get batter.", () => {
        var player = new Player("Bob Gibson", DefensivePosition.pitcher);
        var sut = new LineUp();

        sut.add(player, 1);

        sut.getBatter().should.equal(player);
    });
    it("allows you get on deck.", () => {
        var player = new Player("Bob Gibson", DefensivePosition.pitcher);
        var sut = new LineUp();

        sut.add(player, 2);
        
        sut.getOnDeck().should.equal(player);
    });
    it("allows you to move the lineup forward.", () => {
        var player1 = new Player("Bob Gibson", DefensivePosition.pitcher);
        var player2 = new Player("Lou Brock", DefensivePosition.leftField);
        var sut = new LineUp();

        sut.add(player1, 2);
        sut.add(player2, 3);
        sut.getOnDeck().should.equal(player1);

        sut.nextBatter();
        sut.getBatter().should.equal(player1);
        sut.getOnDeck().should.equal(player2);
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

        sut.getBatter().should.equal(player1);
        sut.getOnDeck().should.equal(player2);
    });
});