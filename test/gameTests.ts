/// <reference path="../typings/index.d.ts" />

import * as chai from "chai";
import {
    AdvanceRunnerCommand, BatterUpCommand, DefensivePosition, FlyOutCommand, HomerunCommand,
    InningHalf, OffensivePosition, Player, Runner, SingleCommand, StartCommand
} from "../baseball/index";

chai.should();

describe("game runner", () => {
    it("can start game", () => {
        var sut = new Runner();

        sut.do(new StartCommand());

        sut.state.started.should.equal(true);
        sut.state.inning.should.equal(1);
        sut.state.inningHalf.should.equal(InningHalf.top);
    });
    it("can score run for home team", () => {
        var sut = new Runner();
        var offensivePlayer = new Player("Turd Ferguson", DefensivePosition.catcher);
        var defensivePlayer = new Player("Ozzie Smith", DefensivePosition.shortStop);

        sut.do(new StartCommand());
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new HomerunCommand(offensivePlayer));

        sut.state.homeScore.should.equal(1);
    });
    it("can score run for visiting team", () => {
        var sut = new Runner();
        var player = new Player("Turd Ferguson", DefensivePosition.catcher);

        sut.do(new StartCommand());
        sut.do(new BatterUpCommand(player));
        sut.do(new HomerunCommand(player));

        sut.state.visitorScore.should.equal(1);
    });
    it("three outs roll over inning half", () => {
        var offensivePlayer = new Player("Turd Ferguson", DefensivePosition.catcher);
        var defensivePlayer = new Player("Ozzie Smith", DefensivePosition.shortStop);
        var sut = new Runner();

        sut.do(new StartCommand());
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));

        sut.state.inningHalf.should.equal(InningHalf.bottom);
    });
    it("six outs roll over inning", () => {
        var offensivePlayer = new Player("Turd Ferguson", DefensivePosition.catcher);
        var defensivePlayer = new Player("Ozzie Smith", DefensivePosition.shortStop);
        var sut = new Runner();

        sut.do(new StartCommand());
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand(offensivePlayer));
        sut.do(new FlyOutCommand(defensivePlayer));

        sut.state.inning.should.equal(2);
    });
    it("runner advancing home scores", () => {
        var sut = new Runner();
        var player1 = new Player("Turd Ferguson", DefensivePosition.catcher);
        var player2 = new Player("Bill Ferguson", DefensivePosition.firstBase);

        sut.do(new StartCommand());
        sut.do(new BatterUpCommand(player1));
        sut.do(new SingleCommand(player1));
        sut.do(new BatterUpCommand(player2));
        sut.do(new SingleCommand(player2));
        sut.do(new AdvanceRunnerCommand(OffensivePosition.home, player1));

        sut.state.visitorScore.should.equal(1);
    });
});
