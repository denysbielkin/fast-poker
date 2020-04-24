import * as React from 'react';
import * as PropTypes from 'prop-types';

import Card from '../Card';

type HandPropsType = {
    player: PlayerType,
    playerNumber: number,
    isWinner: boolean
}

const Hand = (props: HandPropsType) => {
    const { player, playerNumber, isWinner } = props;

    const classname: string = `hand ${isWinner ? 'winning' : ''}`;
    const { cards = [] } = player;

    return (
        <section key={playerNumber} className={classname}>
            <h1>Player {playerNumber}</h1>
            {cards?.map((item: CardType) => <Card key={item.id} {...item} pairs={player.pairs}/>)}
        </section>
    )
};

Hand.propTypes = {
    player: PropTypes.object.isRequired,
    playerNumber: PropTypes.number.isRequired,
    isWinner: PropTypes.bool.isRequired
};

export default Hand;
