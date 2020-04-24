import * as React from 'react';
import { useState, useContext } from 'react';
import { v4 as uuid4 } from 'uuid';

import { GameContext } from '../App';
import Button from './Button';

const Play = () => {
    const { setContextValue,  ...rest } = useContext(GameContext);
    const { setNewWinner } = useContext(GameContext);
    const [round, setRound] = useState<number>(0);
    const suits: Array<string> = ['spade', 'heart', 'diamond', 'club'],
          cardNumbers: Array<string> = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suitsMax: number = suits.length - 1,
          cardsMax: number = cardNumbers.length - 1;
    const handLength: number = 5;

    const getImage = ({suit, cardNumber} : RawCardType) => `http://h3h.net/images/cards/${suit}_${cardNumber}.svg`;
    const getIndex = (max: number) => Math.round(Math.random() * max);

    const generateHand = () => {
        const cards: Array<CardType> = [];
        const isSimilar = (existingItem, newItem) => (existingItem.cardNumber === newItem.cardNumber) && (existingItem.suit === newItem.suit);

        const checkOnAndChangeSimilar = (cardOnCheck: RawCardType) => {
            let serendipity = cards.find((prevCard: CardType) => isSimilar(prevCard, cardOnCheck));
            if (serendipity) {
                return checkOnAndChangeSimilar(createCard());
            }
            return cardOnCheck;
        };

        const createCard = () => ({ suit: suits[getIndex(suitsMax)], cardNumber: cardNumbers[getIndex(cardsMax)] });

        for (let i: number = 0; i < handLength; i++) {
            const newCard: RawCardType = checkOnAndChangeSimilar(createCard());

            const pushedItem: CardType = {
                ...newCard,
                imgSrc: getImage(newCard),
                id: uuid4(),
                pair: { has: false, pairId: null }
            };

            cards.push(pushedItem);
        }
        return cards
    };

    const searchPairs = (cards) => {
        let pairs: Array<CardType> = [];

        cards?.map((mainCard: CardType, mainIndex: number) => {
            pairs[mainIndex] = cards.find((subCard: CardType, subIndex: number) => {
                if (
                    (subCard.cardNumber === mainCard.cardNumber)
                    &&
                    (mainIndex !== subIndex)
                    &&
                    (!mainCard?.pair?.has && !subCard?.pair?.has)
                ) {
                    mainCard.pair = {
                        has: true,
                        pairId: subCard.id

                    };
                    subCard.pair = {
                        has: true,
                        pairId: mainCard.id
                    };
                    return true;
                }
            })
        });

        pairs = pairs?.filter((pair: CardType) => pair);
        return pairs;
    };

    const handleClick = () => {
        setRound(round + 1);

        const cardsOfPlayer_1: Array<CardType> = generateHand(),
              cardsOfPlayer_2: Array<CardType> =  generateHand();

        const result: ContextType = {
            ...rest,
            player_1: { cards: cardsOfPlayer_1, pairs: searchPairs(cardsOfPlayer_1) },
            player_2: { cards: cardsOfPlayer_2, pairs: searchPairs(cardsOfPlayer_2) }
        };

        setContextValue(result);
        setNewWinner(result.player_1, result.player_2)

    };
    return <Button handleClick={handleClick}/>;
};

export default Play;
