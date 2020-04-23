import React from 'react';

const Card = ({id, imgSrc, suit, cardNumber, pair, pairs = []}) => {
    let className = 'card';
    if (pairs.length !== 0 && pair) {
        if ((pairs[0].id === id) || pairs[0].id === pair.pairId) {
            className += ' pair0';
        } else if ((pairs[1].id === id) || pairs[1].id === pair.pairId) {
            className += ' pair1'
        }
    }
    return (
        <img src={imgSrc} className={className} alt={`${suit} ${cardNumber}`}/>
    )
};

export default Card;
