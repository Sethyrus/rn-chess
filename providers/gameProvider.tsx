import { PieceMoves } from "@/utils/consts";
import { createContext, ReactNode, useState } from "react";

export type GameState = {
    board: GameBoard | null;
    selectedPosition: CellPosition | null;
    restartGame: () => void;
    availableMoves: () => CellPosition[];
    movePiece: (to: CellPosition) => void;
    selectCell: (cell: CellPosition) => void;
    clearSelection: () => void;
};

export const GameContext = createContext<GameState>({
    board: null,
    selectedPosition: null,
    restartGame: () => {},
    availableMoves: () => [],
    movePiece: () => {},
    selectCell: () => {},
    clearSelection: () => {},
});

const initialState: GameBoard = [
    [
        {
            position: { row: 0, col: 0 },
            piece: { type: "rook", color: "black" },
        },
        {
            position: { row: 0, col: 1 },
            piece: { type: "knight", color: "black" },
        },
        {
            position: { row: 0, col: 2 },
            piece: { type: "bishop", color: "black" },
        },
        {
            position: { row: 0, col: 3 },
            piece: { type: "queen", color: "black" },
        },
        {
            position: { row: 0, col: 4 },
            piece: { type: "king", color: "black" },
        },
        {
            position: { row: 0, col: 5 },
            piece: { type: "bishop", color: "black" },
        },
        {
            position: { row: 0, col: 6 },
            piece: { type: "knight", color: "black" },
        },
        {
            position: { row: 0, col: 7 },
            piece: { type: "rook", color: "black" },
        },
    ],
    [
        {
            position: { row: 1, col: 0 },
            piece: { type: "pawn", color: "black" },
        },
        {
            position: { row: 1, col: 1 },
            piece: { type: "pawn", color: "black" },
        },
        {
            position: { row: 1, col: 2 },
            piece: { type: "pawn", color: "black" },
        },
        {
            position: { row: 1, col: 3 },
            piece: { type: "pawn", color: "black" },
        },
        {
            position: { row: 1, col: 4 },
            piece: { type: "pawn", color: "black" },
        },
        {
            position: { row: 1, col: 5 },
            piece: { type: "pawn", color: "black" },
        },
        {
            position: { row: 1, col: 6 },
            piece: { type: "pawn", color: "black" },
        },
        {
            position: { row: 1, col: 7 },
            piece: { type: "pawn", color: "black" },
        },
    ],
    [
        { position: { row: 2, col: 0 }, piece: null },
        { position: { row: 2, col: 1 }, piece: null },
        { position: { row: 2, col: 2 }, piece: null },
        { position: { row: 2, col: 3 }, piece: null },
        { position: { row: 2, col: 4 }, piece: null },
        { position: { row: 2, col: 5 }, piece: null },
        { position: { row: 2, col: 6 }, piece: null },
        { position: { row: 2, col: 7 }, piece: null },
    ],
    [
        { position: { row: 3, col: 0 }, piece: null },
        { position: { row: 3, col: 1 }, piece: null },
        { position: { row: 3, col: 2 }, piece: null },
        { position: { row: 3, col: 3 }, piece: null },
        { position: { row: 3, col: 4 }, piece: null },
        { position: { row: 3, col: 5 }, piece: null },
        { position: { row: 3, col: 6 }, piece: null },
        { position: { row: 3, col: 7 }, piece: null },
    ],
    [
        { position: { row: 4, col: 0 }, piece: null },
        { position: { row: 4, col: 1 }, piece: null },
        { position: { row: 4, col: 2 }, piece: null },
        { position: { row: 4, col: 3 }, piece: null },
        { position: { row: 4, col: 4 }, piece: null },
        { position: { row: 4, col: 5 }, piece: null },
        { position: { row: 4, col: 6 }, piece: null },
        { position: { row: 4, col: 7 }, piece: null },
    ],
    [
        { position: { row: 5, col: 0 }, piece: null },
        { position: { row: 5, col: 1 }, piece: null },
        { position: { row: 5, col: 2 }, piece: null },
        { position: { row: 5, col: 3 }, piece: null },
        { position: { row: 5, col: 4 }, piece: null },
        { position: { row: 5, col: 5 }, piece: null },
        { position: { row: 5, col: 6 }, piece: null },
        { position: { row: 5, col: 7 }, piece: null },
    ],
    [
        {
            position: { row: 6, col: 0 },
            piece: { type: "pawn", color: "white" },
        },
        {
            position: { row: 6, col: 1 },
            piece: { type: "pawn", color: "white" },
        },
        {
            position: { row: 6, col: 2 },
            piece: { type: "pawn", color: "white" },
        },
        {
            position: { row: 6, col: 3 },
            piece: { type: "pawn", color: "white" },
        },
        {
            position: { row: 6, col: 4 },
            piece: { type: "pawn", color: "white" },
        },
        {
            position: { row: 6, col: 5 },
            piece: { type: "pawn", color: "white" },
        },
        {
            position: { row: 6, col: 6 },
            piece: { type: "pawn", color: "white" },
        },
        {
            position: { row: 6, col: 7 },
            piece: { type: "pawn", color: "white" },
        },
    ],
    [
        {
            position: { row: 7, col: 0 },
            piece: { type: "rook", color: "white" },
        },
        {
            position: { row: 7, col: 1 },
            piece: { type: "knight", color: "white" },
        },
        {
            position: { row: 7, col: 2 },
            piece: { type: "bishop", color: "white" },
        },
        {
            position: { row: 7, col: 3 },
            piece: { type: "queen", color: "white" },
        },
        {
            position: { row: 7, col: 4 },
            piece: { type: "king", color: "white" },
        },
        {
            position: { row: 7, col: 5 },
            piece: { type: "bishop", color: "white" },
        },
        {
            position: { row: 7, col: 6 },
            piece: { type: "knight", color: "white" },
        },
        {
            position: { row: 7, col: 7 },
            piece: { type: "rook", color: "white" },
        },
    ],
];

export default function GameProvider({ children }: { children: ReactNode }) {
    const [board, setBoard] = useState<GameBoard | null>(null);
    const [selectedPosition, setSelectedPosition] =
        useState<CellPosition | null>(null);

    function restartGame(): void {
        setBoard(initialState);
    }

    function availableMoves(): CellPosition[] {
        if (!board || !selectedPosition) {
            return [];
        }

        const cell = board[selectedPosition.row][selectedPosition.col];

        if (!cell.piece) {
            return [];
        }

        const moves = PieceMoves[cell.piece.type][
            cell.piece.color
        ].possibleMoves(selectedPosition, board);

        return moves;
    }

    function movePiece(to: CellPosition): void {
        if (!board || !selectedPosition) {
            return;
        }

        const newBoard = board.map((row) => [...row]) as GameBoard;

        newBoard[to.row][to.col].piece =
            board[selectedPosition.row][selectedPosition.col].piece;
        newBoard[to.row][to.col].piece!.hasMoved = true;
        newBoard[selectedPosition.row][selectedPosition.col].piece = null;

        setBoard(newBoard);
    }

    function selectCell(cell: CellPosition) {
        setSelectedPosition(cell);
    }

    function clearSelection() {
        setSelectedPosition(null);
    }

    return (
        <GameContext.Provider
            value={{
                board,
                selectedPosition,
                restartGame,
                availableMoves,
                movePiece,
                selectCell,
                clearSelection,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
