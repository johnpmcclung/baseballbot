import { OffensivePosition } from "../enums";
import { FieldersChoiceEvent } from "../events";
import { Player } from "../player";
import { HitCommand } from "./HitCommand";

export class FieldersChoiceCommand extends HitCommand {
    constructor (player: Player | null) {
        super(player, OffensivePosition.first, (player: Player) => new FieldersChoiceEvent(player));
    }
}
