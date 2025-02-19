import { PieceMoves } from "./consts";

function findKingPosition(
    board: GameBoard,
    color: PieceColor
): CellPosition | null {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece?.type === "king" && piece.color === color) {
                return { row, col };
            }
        }
    }
    return null;
}

function isPositionUnderAttack(
    board: GameBoard,
    position: CellPosition | null,
    defendingColor: PieceColor
): boolean {
    if (!position) return false;

    const attackingColor = defendingColor === "white" ? "black" : "white";

    // Revisar todas las casillas del tablero
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];

            // Si encontramos una pieza enemiga
            if (piece && piece.color === attackingColor) {
                // Obtener sus movimientos posibles con avoidLoopMode = true
                const moves = PieceMoves[piece.type][piece.color].possibleMoves(
                    { row, col },
                    board,
                    true // Activar modo para evitar bucle
                );

                if (
                    moves.some(
                        (move) =>
                            move.row === position.row &&
                            move.col === position.col
                    )
                ) {
                    return true;
                }
            }
        }
    }

    return false;
}

function isKingInCheck(board: GameBoard, color: PieceColor): boolean {
    const kingPosition = findKingPosition(board, color);
    return isPositionUnderAttack(board, kingPosition, color);
}

export { isKingInCheck, isPositionUnderAttack, findKingPosition };
