import * as React from 'react';
import { BoardState } from './GameState';
import { Column, Row } from './LayoutProps';
import { SquareProps, Square } from "./StyledSquare";

type BoardProps = {
    board: BoardState;
    onClick: (square: number) => void;
};
export function Board({ board, onClick }: BoardProps) {
    const size = 9;
    const createProps = (square: number): SquareProps => {
        return {
            value: board[square],
            onClick: () => onClick(square),
        };
    };

    var rows: number[] = [];

    for (var i = 1; i <= Math.sqrt(size); i++) {
        rows.push(i);
    }
    var cntr = -1;
    return(
        <Column gap={0}>
            {rows.map(function(object, i){
                    return <Row gap={0}>{rows.map(function(object, j){
                        cntr++;
                        return <Square {...createProps(cntr)}/>;
                    })}</Row>;
                })}
        </Column>
    )

    /*
    return (
        <Column gap={0}>
            <Row gap={0}>
                <Square {...createProps(0)} />
                <Square {...createProps(1)} />
                <Square {...createProps(2)} />
            </Row>
            <Row gap={0}>
                <Square {...createProps(3)} />
                <Square {...createProps(4)} />
                <Square {...createProps(5)} />
            </Row>
            <Row gap={0}>
                <Square {...createProps(6)} />
                <Square {...createProps(7)} />
                <Square {...createProps(8)} />
            </Row>
        </Column>
    );*/
}
