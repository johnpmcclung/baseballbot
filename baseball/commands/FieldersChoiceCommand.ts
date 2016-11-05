import { HitCommand } from "./HitCommand";
import { Player } from "../player";
import { OffensivePosition } from "../enums";
import { FieldersChoiceEvent } from "../events";

export class FieldersChoiceCommand extends HitCommand {
    constructor (player: Player | null) {
        super(player, OffensivePosition.first, (player: Player) => new FieldersChoiceEvent(player))
    }
}
