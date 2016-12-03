import { OffensivePosition } from "../enums";
import { TripleEvent } from "../events";
import { Player } from "../player";
import { HitCommand } from "./HitCommand";

export class TripleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.third, (player: Player) => new TripleEvent(player));
    }
}
