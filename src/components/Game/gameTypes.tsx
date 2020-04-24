type WinnerType = {
    player_1: boolean,
    player_2: boolean,
}

type PairType = {
    has: boolean,
    pairId: string | null
};

type RawCardType = {
    suit: string,
    cardNumber: string,
};

type CardType = RawCardType & {
    id: string,
    imgSrc: string,
    pair: PairType,
};

type PlayerType = {
    cards: Array<CardType> | Array<undefined>,
    pairs: Array<CardType> | Array<undefined>
};

type ContextType = {
    player_1: PlayerType,
    player_2: PlayerType,
    setNewWinner?: Function,
    setContextValue?: Function
}



