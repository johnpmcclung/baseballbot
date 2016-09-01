import { DefensivePosition, GameState, InningHalf, Player } from "../baseball/index";

export class GameStateBuilder {
    private state: GameState = {
        atBat: null,
        firstBase: [],
        gameOver: false,
        homeScore: 0,
        inning: 1,
        inningHalf: InningHalf.top,
        outs: 0,
        secondBase: [],
        started: true,
        thirdBase: [],
        visitorScore: 0,
        winner: null
    };

    public withInningHalf(inningHalf: InningHalf): this {
        this.state.inningHalf = inningHalf;
        return this;
    }

    public withAtBat(player: Player): this {
        this.state.atBat = player;
        return this;
    }

    public withGameOver(gameOver: boolean): this {
        this.state.gameOver = gameOver;
        return this;
    }

    public withFirstBasePlayers(players: Player[]): this {
        this.state.firstBase = players;
        return this;
    }

    public withSecondBasePlayers(players: Player[]): this {
        this.state.secondBase = players;
        return this;
    }

    public withThirdBasePlayers(players: Player[]): this {
        this.state.thirdBase = players;
        return this;
    }

    public withStarted(started: boolean): this {
        this.state.started = started;
        return this;
    }

    public withOuts(outs: number): this {
        this.state.outs = outs;
        return this;
    }

    public withHomeScore(score: number): this {
        this.state.homeScore = score;
        return this;
    }

    public withVisitorScore(score: number): this {
        this.state.visitorScore = score;
        return this;
    }

    public withInning(inning: number): this {
        this.state.inning = inning;
        return this;
    }

    public build(): GameState {
        return this.state;
    }
}

export class PlayerBuilder {
    private player: Player = {
        name: "Turd Ferguson",
        position: DefensivePosition.catcher
    };

    public withName(name: string): this {
        this.player.name = name;
        return this;
    }

    public withPosition(position: DefensivePosition): this {
        this.player.position = position;
        return this;
    }

    public build(): Player {
        return this.player;
    }
}
