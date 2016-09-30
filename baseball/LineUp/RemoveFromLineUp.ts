import { GameCommand } from "../command";
import { Player } from "../player";
import { EventType, Team } from "../enums";
import { GameEvent } from "../event";
import { GameState } from "../state";

export class RemoveFromLineUpCommand extends GameCommand {
    constructor(protected player: Player, protected team: Team) {
        super();
    }

    do(events: Array<GameEvent>, state: GameState): void {
        events.push(new RemoveFromLineUpEvent(this.player, this.team));
    }
}

export class RemoveFromLineUpEvent implements GameEvent {
    public type: EventType;
    public properties: RemoveFromLineUpEventProperties;

    constructor(player: Player, team: Team) {
        this.type = EventType.RemoveFromLineUp;
        this.properties = {
            player: player,
            team: team
        };
    }
}

export interface RemoveFromLineUpEventProperties {
    player: Player;
    team: Team;
}

export function removeFromLineUpEventEvolver(event: RemoveFromLineUpEvent, state: GameState): void {
    if(event.properties.team === Team.home) {
        state.homeLineUp.remove(event.properties.player);
    } else if(event.properties.team === Team.visitor) {
        state.visitorLineUp.remove(event.properties.player);
    }
}