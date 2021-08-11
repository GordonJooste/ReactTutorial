import * as React from 'react';
import { Board } from './BoardProps';
import { useGameState } from './GameState';
import { Column, Row } from './LayoutProps';
import { Log } from './Log';

function Game() {
    const {
        gameState,
        current,
        xIsNext,
        jumpTo,
        winner,
        handleClick
    } = useGameState();
    var drawText = 'Its a Draw!';
    var draw = false;
    if((gameState.history.length === 10)&& (winner=== null)){
        //Its a draw
        draw = true;
    }
    return (
        <Row gap={20}>
            <Column gap={20}>
                <div>{
                    draw
                    ? `${drawText}`
                    : winner
                    ? `Winner ${winner}`
                    : `Next Player ${xIsNext ? 'X' : 'O'}`
                }
                </div>
                <Board board={current} onClick={handleClick}/>
            </Column>
            <Log history={gameState.history} jumpTo={jumpTo} x={gameState.x} y={gameState.y} order={true}/>
        </Row>
    );
}

export default Game;
