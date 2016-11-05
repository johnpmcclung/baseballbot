import { HitCommand } from "./HitCommand";
import { Player } from "../player";
import { OffensivePosition } from "../enums";
import { HitByPitchEvent } from "../events";

export class HitByPitchCommand extends HitCommand {
    constructor (player: Player | null) {
        super(player, OffensivePosition.first, (player: Player) => new HitByPitchEvent(player))
    }
}
