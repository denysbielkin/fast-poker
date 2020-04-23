import React from 'react';

import Card from '../Card';

const Hand = ({player, playerNumber, isWinner}) => {
    const classname = `hand ${isWinner ? 'winning' : ''}`;
    const { cards = [] } = player;
    // const searchPairs = () => {
    //     let pairs = [];
    //
    //     cards?.map((mainCard, mainIndex) => {
    //         pairs[mainIndex] = cards.find((subCard, subIndex) => {
    //             if (
    //                 (subCard.cardNumber === mainCard.cardNumber)
    //                 &&
    //                 (mainIndex !== subIndex)
    //                 &&
    //                 (!mainCard?.pair?.has && !subCard?.pair?.has)
    //             ) {
    //                 mainCard.pair = {
    //                     has: true,
    //                     pairId: subCard.id
    //
    //                 };
    //                 subCard.pair = {
    //                     has: true,
    //                     pairId: mainCard.id
    //                 };
    //                 return true;
    //             }
    //
    //         })
    //     });
    //
    //     pairs = pairs?.filter(pair => pair);
    //
    //
    //     return pairs;
    // };
    return (
        <section key={playerNumber} className={classname}>
            <h1>Player {playerNumber}</h1>
            {cards?.map(item => <Card key={item.id} {...item} pairs={player.pairs}/>)}
        </section>
    )
};

export default Hand;
