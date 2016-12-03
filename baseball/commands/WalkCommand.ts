import { OffensivePosition } from "../enums";
import { WalkEvent } from "../events";
import { Player } from "../player";
import { HitCommand } from "./HitCommand";

export class WalkCommand extends HitCommand {
    constructor (player: Player | null, intentional: boolean) {
        super(player, OffensivePosition.first, (player: Player) => new WalkEvent(player, intentional));
    }
}
