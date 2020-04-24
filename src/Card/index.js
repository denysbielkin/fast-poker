import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ id, imgSrc, suit, cardNumber, pair = {}, pairs = [] }) => {
    let className = 'card';
    if (pairs.length !== 0 && pair.has) {
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

Card.propTypes = {
    id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    suit: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
    pair: PropTypes.shape({
        has: PropTypes.bool.isRequired,
        pairId: PropTypes.string
    }).isRequired,
    pairs: PropTypes.arrayOf(PropTypes.object)
};

export default Card;
