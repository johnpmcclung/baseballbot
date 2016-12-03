import { OffensivePosition } from "../enums";
import { DoubleEvent } from "../events";
import { Player } from "../player";
import { HitCommand } from "./HitCommand";

export class DoubleCommand extends HitCommand {
    constructor(player: Player | null) {
        super(player, OffensivePosition.second, (player: Player) => new DoubleEvent(player));
    }
}
