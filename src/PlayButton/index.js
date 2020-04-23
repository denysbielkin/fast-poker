import React, { useState, useContext } from 'react';
import {v4 as uuid4} from 'uuid';

import {GameContext} from '../App';

const PlayButton = () => {
    const {setContextValue,  ...rest} = useContext(GameContext);
    const { setNewWinner } = useContext(GameContext);
    const [round, setRound] = useState(0);
    // const [blackListRepeats, setBlackListRepeats] = useState([]);
    const suits = ['spade', 'heart', 'diamond', 'club'],
        cardNumbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suitsMax = suits.length - 1,
        cardsMax = cardNumbers.length - 1;
    const handLength = 5;

    const getImage = ({suit, cardNumber}) => `http://h3h.net/images/cards/${suit}_${cardNumber}.svg`;
    const getIndex = (max) => Math.round(Math.random() * max);

    // const setKey = ({ suit, cardNumber }, index) => suit + (index * cardNumber) + index;

    const generateHand = () => {
        const cards = [];
        const isSimilar = (existingItem, newItem) => (existingItem.cardNumber === newItem.cardNumber) && (existingItem.suit === newItem.suit);

        const checkOnAndChangeSimilar = (cardOnCheck) => {
            let serendipity = cards.find(prevCard => isSimilar(prevCard, cardOnCheck));
            if (serendipity) {
                return checkOnAndChangeSimilar(createCard());
            }
            return cardOnCheck;
        };


        /*
                const checkOnAndChangeSimilar = () => {
                    return (cardOnCheck) => {
                        const blackList = [];
                        let isBlackListed = blackList.find(tabooCard => isSimilar(tabooCard, cardOnCheck));
                        if(isBlackListed){
                            console.log('black trigger')
                           return checkOnAndChangeSimilar(createCard())
                        } else {
                            console.log('else ')

                            console.log({blackList})
                            let serendipity = cards.find( prevCard => isSimilar(prevCard, cardOnCheck));
                            if(serendipity) {
                                console.log('serendipity trigger')
                                blackList.push(cardOnCheck);
                                return checkOnAndChangeSimilar(createCard());
                            }
                            console.log('free')
                            return cardOnCheck;
                        }
                    }
                };

        * */


        const createCard = () => ({suit: suits[getIndex(suitsMax)], cardNumber: cardNumbers[getIndex(cardsMax)]});

        for (let i = 0; i < handLength; i++) {
            const newCard = checkOnAndChangeSimilar(createCard());
            cards.push({
                ...newCard,
                imgSrc: getImage(newCard),
                id: uuid4()//setKey({suit, cardNumber}, i),
            })
        }
        return cards

    };

    const searchPairs = (cards) => {
        let pairs = [];

        cards?.map((mainCard, mainIndex) => {
            pairs[mainIndex] = cards.find((subCard, subIndex) => {
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

        pairs = pairs?.filter(pair => pair);


        return pairs;
    };

    const handleClick = () => {
        setRound(round + 1);
        const player_1 = {cards: generateHand()}, player_2 = {cards: generateHand()};
        const result = {
            player_1: {pairs: searchPairs(player_1.cards), ...player_1},
            player_2: {pairs: searchPairs(player_2.cards), ...player_2}
        };

        setContextValue({
            ...rest,
            player_1: result.player_1, player_2: result.player_2
        });
        setNewWinner(result.player_1, result.player_2)

    };
    return (
        <section className='buttons'>
            <button onClick={handleClick}>Play Again</button>
        </section>
    );
};

export default PlayButton;
