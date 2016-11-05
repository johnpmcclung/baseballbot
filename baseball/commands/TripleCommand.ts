import { HitCommand } from "./HitCommand";
import { Player } from "../player";
import { OffensivePosition } from "../enums";
import { TripleEvent } from "../events";

export class TripleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.third, (player: Player) => new TripleEvent(player));
    }
}
