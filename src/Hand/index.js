import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

const Hand = ({ player = {}, playerNumber, isWinner }) => {
    const classname = `hand ${isWinner ? 'winning' : ''}`;
    const { cards = [] } = player;

    return (
        <section key={playerNumber} className={classname}>
            <h1>Player {playerNumber}</h1>
            {cards?.map(item => <Card key={item.id} {...item} pairs={player.pairs}/>)}
        </section>
    )
};

Hand.propTypes = {
    player: PropTypes.object.isRequired,
    playerNumber: PropTypes.number.isRequired,
    isWinner: PropTypes.bool.isRequired
};

export default Hand;
