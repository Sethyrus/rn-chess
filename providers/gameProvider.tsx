import { PieceMoves } from "@/utils/consts";
import { createContext, ReactNode, useState } from "react";

export type GameState = {
    board: GameBoard | null;
    selectedPosition: CellPosition | null;
    gameHistory: HistoryStep[];
    restartGame: () => void;
    availableMoves: () => CellPosition[];
    movePiece: (to: CellPosition) => void;
    selectCell: (position: CellPosition) => void;
    clearSelection: () => void;
};

export const GameContext = createContext<GameState>({
    board: null,
    selectedPosition: null,
    gameHistory: [],
    restartGame: () => {},
    availableMoves: () => [],
    movePiece: () => {},
    selectCell: () => {},
    clearSelection: () => {},
});

const initialState: GameBoard = [
    [
        { type: "rook", color: "black" },
        { type: "knight", color: "black" },
        { type: "bishop", color: "black" },
        { type: "queen", color: "black" },
        { type: "king", color: "black" },
        { type: "bishop", color: "black" },
        { type: "knight", color: "black" },
        { type: "rook", color: "black" },
    ],
    [
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
        { type: "pawn", color: "black" },
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
        { type: "pawn", color: "white" },
    ],
    [
        { type: "rook", color: "white" },
        { type: "knight", color: "white" },
        { type: "bishop", color: "white" },
        { type: "queen", color: "white" },
        { type: "king", color: "white" },
        { type: "bishop", color: "white" },
        { type: "knight", color: "white" },
        { type: "rook", color: "white" },
    ],
];

export default function GameProvider({ children }: { children: ReactNode }) {
    const [board, setBoard] = useState<GameBoard | null>(null);
    const [selectedPosition, setSelectedPosition] =
        useState<CellPosition | null>(null);
    const [gameHistory, setGameHistory] = useState<HistoryStep[]>([]);

    function restartGame(): void {
        setBoard(initialState);
    }

    function availableMoves(): CellPosition[] {
        if (!board || !selectedPosition) {
            return [];
        }

        const piece = board[selectedPosition.row][selectedPosition.col];

        if (!piece) {
            return [];
        }

        // Primer turno, solo se pueden mover las piezas blancas
        if (gameHistory.length === 0 && piece.color !== "white") {
            return [];
        }

        // No se puede mover una pieza del mismo color que la última movida
        if (
            gameHistory.length > 0 &&
            piece.color == gameHistory[gameHistory.length - 1]?.movedPiece.color
        ) {
            return [];
        }

        const moves = PieceMoves[piece.type][piece.color].possibleMoves(
            selectedPosition,
            board
        );

        return moves;
    }

    function movePiece(to: CellPosition): void {
        if (!board || !selectedPosition) {
            return;
        }

        const newBoard = board.map((row) => [...row]) as GameBoard;
        const movingPiece =
            newBoard[selectedPosition.row][selectedPosition.col];

        if (!movingPiece) return;

        const historyStep: HistoryStep = {
            movedPiece: movingPiece,
            capturedPiece: newBoard[to.row][to.col],
            from: selectedPosition,
            to,
        };

        newBoard[to.row][to.col] = { ...movingPiece, hasMoved: true };
        newBoard[selectedPosition.row][selectedPosition.col] = null;
        setGameHistory([...gameHistory, historyStep]);
        setBoard(newBoard);
    }

    function selectCell(position: CellPosition) {
        setSelectedPosition(position);
    }

    function clearSelection() {
        setSelectedPosition(null);
    }

    return (
        <GameContext.Provider
            value={{
                board,
                selectedPosition,
                gameHistory,
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
