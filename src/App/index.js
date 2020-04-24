import React, { createContext, useState } from 'react';
import Game from '../Game';

export const GameContext = createContext({});

const App = () => {
    const [contextValue, setContextValue] = useState({});
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
