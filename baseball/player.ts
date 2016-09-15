import { DefensivePosition } from "./enums";

export class Player {
    constructor (public name: string, public position: DefensivePosition) { }
};

export class LineUp {
    static battingSpotOffset: number = 10;
    lineUp: Array<Player> = new Array<Player>();
    currentBatter: number;
    onDeck: number;

    constructor() {
        for(var i = 0; i < 20; i++){
            this.lineUp[i] = null;
        }
        this.currentBatter = 1 + LineUp.battingSpotOffset;
        this.onDeck = 2 + LineUp.battingSpotOffset;
    }

    public add(player: Player, spot: number): void {
        if(this.lineUp[spot + LineUp.battingSpotOffset] || this.lineUp[player.position]) {
            throw new Error("That position in the line up is already occupied.");
        }
        this.lineUp[player.position] = player;
        this.lineUp[spot + LineUp.battingSpotOffset] = player;
    }

    public getBatter(): Player {
        return this.lineUp[this.currentBatter];
    }

    public getOnDeck(): Player {
        return this.lineUp[this.onDeck];
    }

    public getPosition (position: DefensivePosition): Player {
        return this.lineUp[position];
    }

    public getSpot (spot: number): Player {
        return this.lineUp[spot + LineUp.battingSpotOffset];
    }

    public nextBatter(): void {
        if(this.currentBatter === 9 + LineUp.battingSpotOffset) {
            this.currentBatter = 1 + LineUp.battingSpotOffset;
        } else {
            this.currentBatter = this.currentBatter + 1;
        }
        if(this.onDeck === 9 + LineUp.battingSpotOffset) {
            this.onDeck = 1 + LineUp.battingSpotOffset;
        } else {
            this.onDeck = this.onDeck + 1;
        }
    }

    public remove (player: Player): void {
        this.lineUp = this.lineUp.filter((playerInLineUp) => { 
            return player !== playerInLineUp; 
        })
    }
}
