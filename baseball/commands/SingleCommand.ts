import { HitCommand } from "./HitCommand";
import { Player } from "../player";
import { OffensivePosition } from "../enums";
import { SingleEvent } from "../events";

export class SingleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.first, (player: Player) => new SingleEvent(player));
    }
}
