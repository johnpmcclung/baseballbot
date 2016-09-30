
export enum EventType {
    Start, Inning, InningHalf,
    Out, RunScored, GameOver,
    FlyOut, Homerun, BatterUp,
    Single, AdvanceRunner,
    Double, Triple, LineOut,
    GroundOut, AssistedOut,
    AddToLineUp, RemoveFromLineUp
}

export enum InningHalf {
    none, top, bottom
}

export enum Team {
    home, visitor
}

export enum DefensivePosition {
    pitcher = 1,
    catcher,
    firstBase,
    secondBase,
    thirdBase,
    shortStop,
    leftField,
    centerField,
    rightField
}

export enum OffensivePosition {
    atBat,
    first,
    second,
    third,
    home
}
