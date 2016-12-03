import { OffensivePosition } from "../enums";
import { HitByPitchEvent } from "../events";
import { Player } from "../player";
import { HitCommand } from "./HitCommand";

export class HitByPitchCommand extends HitCommand {
    constructor (player: Player | null) {
        super(player, OffensivePosition.first, (player: Player) => new HitByPitchEvent(player));
    }
}
