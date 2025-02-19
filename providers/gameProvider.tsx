import { PieceMoves } from "@/utils/consts";
import { createContext, ReactNode, useEffect, useState } from "react";
import { isKingInCheck } from "@/utils/helpers";

export type GameState = {
    board: GameBoard | null;
    selectedPosition: CellPosition | null;
    gameHistory: HistoryStep[];
    historyOffset: number;
    restartGame: () => void;
    availableMoves: () => CellPosition[];
    movePiece: (to: CellPosition) => void;
    selectCell: (position: CellPosition) => void;
    clearSelection: () => void;
    historyForward: () => void;
    historyBackward: () => void;
};

export const GameContext = createContext<GameState>({
    board: null,
    selectedPosition: null,
    gameHistory: [],
    historyOffset: 0,
    restartGame: () => {},
    availableMoves: () => [],
    movePiece: () => {},
    selectCell: () => {},
    clearSelection: () => {},
    historyForward: () => {},
    historyBackward: () => {},
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
    const [historyOffset, setHistoryOffset] = useState<number>(0);
    const [lastHistoryOffset, setLastHistoryOffset] = useState<number>(0);

    function restartGame(): void {
        setBoard(initialState);
    }

    function availableMoves(): CellPosition[] {
        if (!board || !selectedPosition || historyOffset > 0) {
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

        // Filtrar movimientos que pondrían al rey en jaque
        return moves.filter((move) => {
            // Crear un tablero temporal con el movimiento aplicado
            const tempBoard = board.map((row) => [...row]) as GameBoard;
            // Aplicar el movimiento
            tempBoard[move.row][move.col] =
                tempBoard[selectedPosition.row][selectedPosition.col];
            tempBoard[selectedPosition.row][selectedPosition.col] = null;
            // Verificar si el rey quedaría en jaque
            return !isKingInCheck(tempBoard, piece.color);
        });
    }

    function movePiece(to: CellPosition): void {
        if (!board || !selectedPosition) {
            return;
        }

        const newBoard = board.map((row) => [...row]) as GameBoard;
        const movingPiece =
            newBoard[selectedPosition.row][selectedPosition.col];

        if (!movingPiece) return;

        let promotion: PieceType | undefined;

        // Promoción del peón
        if (movingPiece.type === "pawn") {
            // Peón blanco llegando a la primera fila o peón negro llegando a la última fila
            if (
                (movingPiece.color === "white" && to.row === 0) ||
                (movingPiece.color === "black" && to.row === 7)
            ) {
                // Por defecto promovemos a reina
                promotion = "queen";
                // Actualizar la pieza con la promoción
                movingPiece.type = promotion;
            }
        }

        // Enroque
        if (movingPiece.type === "king") {
            // Enroque corto blanco
            if (
                selectedPosition.row === 7 &&
                selectedPosition.col === 4 &&
                to.row === 7 &&
                to.col === 6
            ) {
                newBoard[7][5] = newBoard[7][7]; // Mover torre
                newBoard[7][7] = null;
            }
            // Enroque largo blanco
            if (
                selectedPosition.row === 7 &&
                selectedPosition.col === 4 &&
                to.row === 7 &&
                to.col === 2
            ) {
                newBoard[7][3] = newBoard[7][0]; // Mover torre
                newBoard[7][0] = null;
            }
            // Enroque corto negro
            if (
                selectedPosition.row === 0 &&
                selectedPosition.col === 4 &&
                to.row === 0 &&
                to.col === 6
            ) {
                newBoard[0][5] = newBoard[0][7]; // Mover torre
                newBoard[0][7] = null;
            }
            // Enroque largo negro
            if (
                selectedPosition.row === 0 &&
                selectedPosition.col === 4 &&
                to.row === 0 &&
                to.col === 2
            ) {
                newBoard[0][3] = newBoard[0][0]; // Mover torre
                newBoard[0][0] = null;
            }
        }

        const historyStep: HistoryStep = {
            movedPiece: movingPiece,
            capturedPiece: newBoard[to.row][to.col],
            from: selectedPosition,
            to,
            promotion,
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

    useEffect(() => {
        if (!board) return;
        if (historyOffset === lastHistoryOffset) return;
        const newBoard = initialState.map((row) => [...row]) as GameBoard;
        const stepsToApply = gameHistory.length - historyOffset;
        for (let i = 0; i < stepsToApply; i++) {
            const step = gameHistory[i];
            if (!step.movedPiece) continue;
            newBoard[step.to.row][step.to.col] = {
                ...step.movedPiece,
                hasMoved: true,
            };
            newBoard[step.from.row][step.from.col] = null;
            if (step.promotion) {
                newBoard[step.to.row][step.to.col]!.type = step.promotion;
            }
        }
        setBoard(newBoard);
        setLastHistoryOffset(historyOffset);
    }, [historyOffset, gameHistory, board, lastHistoryOffset]);

    function historyForward() {
        if (historyOffset > 0) {
            setHistoryOffset(historyOffset - 1);
        }
    }

    function historyBackward() {
        if (historyOffset < gameHistory.length) {
            setHistoryOffset(historyOffset + 1);
        }
    }

    return (
        <GameContext.Provider
            value={{
                board,
                selectedPosition,
                gameHistory,
                historyOffset,
                restartGame,
                availableMoves,
                movePiece,
                selectCell,
                clearSelection,
                historyForward,
                historyBackward,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
