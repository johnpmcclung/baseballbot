import { InningHalf, Team } from "./enums";
import { Player } from "./player";

export class GameState {
    atBat: Player;
    firstBase: Array<Player>;
    gameOver: boolean;
    homeScore: number;
    inning: number;
    inningHalf: InningHalf;
    outs: number;
    secondBase: Array<Player>;
    started: boolean;
    thirdBase: Array<Player>;
    visitorScore: number;
    winner: Team;

    constructor() {
        this.atBat = null;
        this.firstBase = [];
        this.inning = 0;
        this.inningHalf = InningHalf.none;
        this.gameOver = false;
        this.homeScore = 0;
        this.outs = 0;
        this.secondBase = [];
        this.started = false;
        this.thirdBase = [];
        this.visitorScore = 0;
        this.winner = null;
    }
}
