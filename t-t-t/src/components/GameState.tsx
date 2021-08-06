import { useState } from 'react';
export type Value = 'X' | 'O' | null;

export type BoardState = Value[];
const createBoardState = () => Array<Value>(9).fill(null);

function calculateWinner(boardState: BoardState){
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    for (let i=0; i<winningCombinations.length; i++){
        const [a,b,c] = winningCombinations[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

export type GameState = {
    history: BoardState[],
    step: number,
    x: any,
    y: any,
}

export function useGameState(){
    const [gameState, setGameState] = useState<GameState>({
        history: [createBoardState()],
        step: 0,
        x: null,
        y: null,
    });

    const current = gameState.history[gameState.step];
    const xIsNext = (gameState.step %2) ===0;
    const winner = calculateWinner(current);    

    function handleClick(square: number) {
        const history = gameState.history.slice(0, gameState.step +1);
        const boardState = history[history.length -1];
        if (calculateWinner(boardState) || boardState[square]){
            return;
        }
        
        const newBoardState = boardState.slice();
        newBoardState[square] = (gameState.step %2) === 0 ? 'X' : 'O';
        history.push(newBoardState);
        setGameState({
            history: history,
            step: history.length -1,
            x: Math.floor(square/3),
            y: square%3,
        });
    }

    function calcCoOrd(gameState: GameState){
        const current = gameState.history[gameState.step];
        const previous = gameState.history[gameState.step-1];
        if(previous != null){
            for(let i=0; i < previous.length; i++){
                if(current[i] != previous[i]){
                    return i;
                }
            };
        };
        return 0;
    }

    function jumpTo(step: number){
        setGameState({
            history: gameState.history,
            step,
            x:Math.floor(step/3),
            y:step%3,
        });
    }

    return{
        gameState,
        current,
        xIsNext,
        winner,
        handleClick,
        jumpTo,
    };
}
