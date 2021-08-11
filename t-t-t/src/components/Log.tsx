import * as React from 'react';
import { Board } from './BoardProps';
import { BoardState } from './GameState';
import { GameState } from './GameState';

type LogProps = {
    history: BoardState[];
    jumpTo: (step: number) => void;
    x: any,
    y: any,
    order: Boolean,
};

export function Log(props: LogProps) {
    var array = props.history;
    
    return (
        <ol>
            Row{props.x+1} Col{props.y+1} <br></br>
            {array.map((_, index) => {
                return (
                    <li key={index}>
                        <button onClick={() => props.jumpTo(index)}>
                            Go to {index === 0 ? 'start' : `move #${index}` }
                        </button>
                    </li>
                );
            })}

        </ol>
    );    
    
}
