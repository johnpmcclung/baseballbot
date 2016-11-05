import { HitCommand } from "./HitCommand";
import { Player } from "../player";
import { OffensivePosition } from "../enums";
import { DoubleEvent } from "../events";

export class DoubleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.second, (player: Player) => new DoubleEvent(player));
    }
}
