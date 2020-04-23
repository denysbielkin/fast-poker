import React, {useContext, useEffect,  useState} from 'react';
import Hand from '../Hand';
import PlayButton from '../PlayButton';
import {GameContext} from '../App';

const Game = () => {
    const { setContextValue, ...rest } = useContext(GameContext);
    const { player_1 = {}, player_2 = {} } = useContext(GameContext);
    const findTheWinner = (player_1, player_2) => {
        if ((player_1?.pairs?.length === player_2?.pairs?.length) && ((player_1?.pairs?.length > 0) && (player_2?.pairs?.length > 0)) ) {
            return { player_1: true, player_2: true };
        } else if(player_1?.pairs?.length || player_2?.pairs?.length) {
            return {
                player_1: player_1?.pairs?.length > player_2?.pairs?.length,
                player_2: player_1?.pairs?.length < player_2?.pairs?.length
            };
        }
        return { player_1: false, player_2: false };
    };

    const [winner, setWinner] = useState(findTheWinner(player_1, player_2));

    const setNewWinner = (player_1, player_2) => setWinner(findTheWinner(player_1, player_2));

    useEffect(()=> {
        setContextValue({
            setNewWinner,
            ...rest
        })
    },[]);

    return (
        <>
            <Hand key={1} player={player_1} playerNumber={1} isWinner={winner?.player_1} />
            {(winner?.player_1 && winner?.player_2) && (
                <h1 style={{marginLeft: 20}}>FRIENDSHIP IS THE WINNER!</h1>
            )}
            <Hand key={2} player={player_2} playerNumber={2} isWinner={winner?.player_2} />
            <PlayButton/>
        </>
    )
};

export default Game;

