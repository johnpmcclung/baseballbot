import { InningHalf, Team } from "./enums";
import { LineUp, Player } from "./player";

export class GameState {
    atBat: Player | null;
    firstBase: Array<Player | null>;
    gameOver: boolean;
    homeLineUp: LineUp;
    homeScore: number;
    inning: number;
    inningHalf: InningHalf;
    outs: number;
    secondBase: Array<Player | null>;
    started: boolean;
    thirdBase: Array<Player | null>;
    visitorLineUp: LineUp;
    visitorScore: number;
    winner: Team | null;

    constructor() {
        this.atBat = null;
        this.firstBase = [];
        this.inning = 0;
        this.inningHalf = InningHalf.none;
        this.gameOver = false;
        this.homeLineUp = new LineUp();
        this.homeScore = 0;
        this.outs = 0;
        this.secondBase = [];
        this.started = false;
        this.thirdBase = [];
        this.visitorLineUp = new LineUp();
        this.visitorScore = 0;
        this.winner = null;
    }
}
