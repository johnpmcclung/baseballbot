import { OffensivePosition } from "../enums";
import { SingleEvent } from "../events";
import { Player } from "../player";
import { HitCommand } from "./HitCommand";

export class SingleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.first, (player: Player) => new SingleEvent(player));
    }
}
