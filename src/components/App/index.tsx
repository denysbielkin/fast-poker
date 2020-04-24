import * as React from 'react';
import { createContext, useState } from 'react';
import Game from '../Game';

const init: ContextType = {
    player_1: {
        cards: [],
        pairs: []
    },
    player_2: {
        cards: [],
        pairs: []
    }
};
export const GameContext = createContext<ContextType>(init);

const App = () => {
    const [contextValue, setContextValue] = useState<ContextType>(init);
    return (
        <GameContext.Provider value={{
            ...contextValue,
            setContextValue
        }}>
            <Game/>
        </GameContext.Provider>
    )
};

export default App;
