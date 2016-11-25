import {
    AddToLineUpCommand, AdvanceRunnerCommand, BatterUpCommand, DefensivePosition,
    FlyOutCommand, HomerunCommand, InningHalf, OffensivePosition, Player, Runner,
    SingleCommand, StartCommand, Team
} from "../baseball/index";

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

        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 1", DefensivePosition.catcher), 1, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 2", DefensivePosition.pitcher), 2, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 3", DefensivePosition.firstBase), 3, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 4", DefensivePosition.secondBase), 1, Team.home));

        var defensivePlayer = new Player("Ozzie Smith", DefensivePosition.shortStop);

        sut.do(new StartCommand());
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new HomerunCommand(null));

        sut.state.homeScore.should.equal(1);
    });
    it("can score run for visiting team", () => {
        var sut = new Runner();

        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 1", DefensivePosition.catcher), 1, Team.visitor));
        sut.do(new StartCommand());
        sut.do(new BatterUpCommand());
        sut.do(new HomerunCommand(null));

        sut.state.visitorScore.should.equal(1);
    });
    it("three outs roll over inning half", () => {
        var defensivePlayer = new Player("Ozzie Smith", DefensivePosition.shortStop);
        var sut = new Runner();

        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 1", DefensivePosition.catcher), 1, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 2", DefensivePosition.pitcher), 2, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 3", DefensivePosition.firstBase), 3, Team.visitor));
        sut.do(new StartCommand());
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));

        sut.state.inningHalf.should.equal(InningHalf.bottom);
    });
    it("six outs roll over inning", () => {
        var defensivePlayer = new Player("Ozzie Smith", DefensivePosition.shortStop);
        var sut = new Runner();

        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 1", DefensivePosition.catcher), 1, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 2", DefensivePosition.pitcher), 2, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 3", DefensivePosition.firstBase), 3, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 1", DefensivePosition.catcher), 1, Team.home));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 2", DefensivePosition.pitcher), 2, Team.home));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 3", DefensivePosition.firstBase), 3, Team.home));
        sut.do(new StartCommand());
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));
        sut.do(new BatterUpCommand());
        sut.do(new FlyOutCommand(defensivePlayer));

        sut.state.inning.should.equal(2);
    });
    it("runner advancing home scores", () => {
        var sut = new Runner();

        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 1", DefensivePosition.catcher), 1, Team.visitor));
        sut.do(new AddToLineUpCommand(new Player("Turd Ferguson 2", DefensivePosition.pitcher), 2, Team.visitor));
        sut.do(new StartCommand());
        sut.do(new BatterUpCommand());
        sut.do(new SingleCommand(sut.state.visitorLineUp.getBatter()));
        sut.do(new BatterUpCommand());
        sut.do(new SingleCommand(sut.state.visitorLineUp.getBatter()));
        sut.do(new AdvanceRunnerCommand(OffensivePosition.home, null));

        sut.state.visitorScore.should.equal(1);
    });
});
