import { OffensivePosition } from "../enums";
import { HomerunEvent } from "../events";
import { Player } from "../player";
import { HitCommand } from "./HitCommand";

export class HomerunCommand extends HitCommand {
    constructor (player: Player | null) {
        super(player, OffensivePosition.home, (player: Player) => new HomerunEvent(player));
    }
}
