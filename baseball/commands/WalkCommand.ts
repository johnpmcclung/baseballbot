import { HitCommand } from "./HitCommand";
import { Player } from "../player";
import { OffensivePosition } from "../enums";
import { WalkEvent } from "../events";

export class WalkCommand extends HitCommand {
    constructor (player: Player | null, intentional: boolean) {
        super(player, OffensivePosition.first, (player: Player) => new WalkEvent(player, intentional))
    }
}
