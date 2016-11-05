import { HitCommand } from "./HitCommand";
import { Player } from "../player";
import { OffensivePosition } from "../enums";
import { HomerunEvent } from "../events";

export class HomerunCommand extends HitCommand {
    constructor (player: Player | null) {
        super(player, OffensivePosition.home, (player: Player) => new HomerunEvent(player));
    }
}
