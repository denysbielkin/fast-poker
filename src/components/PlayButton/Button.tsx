import * as React from 'react';
import { SyntheticEvent } from 'react';

const Button = (props: {handleClick: (event: SyntheticEvent) => void}) => (
    <section className='buttons'>
        <button onClick={props.handleClick}>Play Again</button>
    </section>
);

export default Button
