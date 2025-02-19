import { isKingInCheck, isPositionUnderAttack } from "./helpers";

/**
 * Definición de movimientos posibles para cada tipo de pieza.
 * La estructura está organizada por tipo de pieza, color y sus movimientos permitidos.
 */
export const PieceMoves: Record<PieceType, PieceMove> = {
    pawn: {
        white: {
            possibleMoves: (position, board) => {
                const moves = [];
                const [row, col] = [position.row, position.col];

                // Movimiento hacia adelante
                // Verifica movimientos de dos casillas en la posición inicial (fila 6)
                if (row === 6) {
                    if (!board[row - 1][col]) {
                        moves.push({ row: row - 1, col });
                        if (!board[row - 2][col]) {
                            moves.push({ row: row - 2, col });
                        }
                    }
                } else {
                    if (!board[row - 1][col]) {
                        moves.push({ row: row - 1, col });
                    }
                }

                // Capturas diagonales
                // Verifica posibles capturas en diagonal
                const captureMoves = [
                    { row: row - 1, col: col - 1 }, // Captura diagonal izquierda
                    { row: row - 1, col: col + 1 }, // Captura diagonal derecha
                ];

                for (const move of captureMoves) {
                    if (
                        move.row >= 0 &&
                        move.row < 8 &&
                        move.col >= 0 &&
                        move.col < 8
                    ) {
                        const piece = board[move.row][move.col];
                        if (piece && piece.color === "black") {
                            moves.push(move);
                        }
                    }
                }

                return moves;
            },
        },
        black: {
            possibleMoves: (position, board) => {
                const moves = [];
                const [row, col] = [position.row, position.col];

                // Movimiento hacia adelante
                if (row === 1) {
                    if (!board[row + 1][col]) {
                        moves.push({ row: row + 1, col });
                        if (!board[row + 2][col]) {
                            moves.push({ row: row + 2, col });
                        }
                    }
                } else if (row < 7 && !board[row + 1][col]) {
                    moves.push({ row: row + 1, col });
                }

                // Capturas diagonales
                const captureMoves = [
                    { row: row + 1, col: col - 1 },
                    { row: row + 1, col: col + 1 },
                ];

                for (const move of captureMoves) {
                    if (
                        move.row >= 0 &&
                        move.row < 8 &&
                        move.col >= 0 &&
                        move.col < 8
                    ) {
                        const piece = board[move.row][move.col];
                        if (piece && piece.color === "white") {
                            moves.push(move);
                        }
                    }
                }

                return moves;
            },
        },
    },
    rook: {
        white: {
            possibleMoves: (position, board) => {
                const moves = [];
                // Direcciones de movimiento: arriba, abajo, izquierda, derecha
                for (const [dr, dc] of [
                    [-1, 0], // Arriba
                    [1, 0], // Abajo
                    [0, -1], // Izquierda
                    [0, 1], // Derecha
                ]) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (piece.color !== "white") {
                                moves.push({ row: r, col: c });
                            }
                            break;
                        }
                        r += dr;
                        c += dc;
                    }
                }
                return moves;
            },
        },
        black: {
            possibleMoves: (position, board) => {
                const moves = [];
                for (const [dr, dc] of [
                    [-1, 0], // Arriba
                    [1, 0], // Abajo
                    [0, -1], // Izquierda
                    [0, 1], // Derecha
                ]) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (piece.color !== "black") {
                                moves.push({ row: r, col: c });
                            }
                            break;
                        }
                        r += dr;
                        c += dc;
                    }
                }
                return moves;
            },
        },
    },
    knight: {
        white: {
            possibleMoves: (position, board) => {
                const moves = [];
                // Movimientos en L: 2 casillas en una dirección y 1 en perpendicular
                const offsets = [
                    [-2, -1], // Movimientos hacia arriba
                    [-2, 1],
                    [2, -1], // Movimientos hacia abajo
                    [2, 1],
                    [-1, -2], // Movimientos hacia los lados (izquierda)
                    [-1, 2],
                    [1, -2], // Movimientos hacia los lados (derecha)
                    [1, 2],
                ];
                for (const [dr, dc] of offsets) {
                    const r = position.row + dr;
                    const c = position.col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece || piece.color !== "white") {
                            moves.push({ row: r, col: c });
                        }
                    }
                }
                return moves;
            },
        },
        black: {
            possibleMoves: (position, board) => {
                const moves = [];
                const offsets = [
                    [-2, -1], // Movimientos hacia arriba
                    [-2, 1],
                    [2, -1], // Movimientos hacia abajo
                    [2, 1],
                    [-1, -2], // Movimientos hacia los lados (izquierda)
                    [-1, 2],
                    [1, -2], // Movimientos hacia los lados (derecha)
                    [1, 2],
                ];
                for (const [dr, dc] of offsets) {
                    const r = position.row + dr;
                    const c = position.col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece || piece.color !== "black") {
                            moves.push({ row: r, col: c });
                        }
                    }
                }
                return moves;
            },
        },
    },
    bishop: {
        white: {
            possibleMoves: (position, board) => {
                const moves = [];
                // Direcciones diagonales
                for (const [dr, dc] of [
                    [1, 1], // Diagonal inferior derecha
                    [1, -1], // Diagonal inferior izquierda
                    [-1, 1], // Diagonal superior derecha
                    [-1, -1], // Diagonal superior izquierda
                ]) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (piece.color !== "white") {
                                moves.push({ row: r, col: c });
                            }
                            break;
                        }
                        r += dr;
                        c += dc;
                    }
                }
                return moves;
            },
        },
        black: {
            possibleMoves: (position, board) => {
                const moves = [];
                for (const [dr, dc] of [
                    [1, 1], // Diagonal inferior derecha
                    [1, -1], // Diagonal inferior izquierda
                    [-1, 1], // Diagonal superior derecha
                    [-1, -1], // Diagonal superior izquierda
                ]) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (piece.color !== "black") {
                                moves.push({ row: r, col: c });
                            }
                            break;
                        }
                        r += dr;
                        c += dc;
                    }
                }
                return moves;
            },
        },
    },
    queen: {
        white: {
            possibleMoves: (position, board) => {
                const moves = [];
                // Combina movimientos de torre y alfil
                const directions = [
                    [-1, 0], // Movimientos de torre
                    [1, 0],
                    [0, -1],
                    [0, 1],
                    [1, 1], // Movimientos de alfil
                    [1, -1],
                    [-1, 1],
                    [-1, -1],
                ];
                for (const [dr, dc] of directions) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (piece.color !== "white") {
                                moves.push({ row: r, col: c });
                            }
                            break;
                        }
                        r += dr;
                        c += dc;
                    }
                }
                return moves;
            },
        },
        black: {
            possibleMoves: (position, board) => {
                const moves = [];
                const directions = [
                    [-1, 0], // Movimientos de torre
                    [1, 0],
                    [0, -1],
                    [0, 1],
                    [1, 1], // Movimientos de alfil
                    [1, -1],
                    [-1, 1],
                    [-1, -1],
                ];
                for (const [dr, dc] of directions) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (piece.color !== "black") {
                                moves.push({ row: r, col: c });
                            }
                            break;
                        }
                        r += dr;
                        c += dc;
                    }
                }
                return moves;
            },
        },
    },
    king: {
        white: {
            possibleMoves: (position, board, avoidLoopMode = false) => {
                const moves = [];
                // Movimientos normales del rey
                for (const [dr, dc] of [
                    [-1, 0], // Arriba
                    [1, 0], // Abajo
                    [0, -1], // Izquierda
                    [0, 1], // Derecha
                    [-1, -1], // Diagonal superior izquierda
                    [-1, 1], // Diagonal superior derecha
                    [1, -1], // Diagonal inferior izquierda
                    [1, 1], // Diagonal inferior derecha
                ]) {
                    const r = position.row + dr;
                    const c = position.col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece || piece.color !== "white") {
                            moves.push({ row: r, col: c });
                        }
                    }
                }

                // Solo verificar enroque si no estamos en modo evitar bucle
                // Verifica condiciones para el enroque
                if (!avoidLoopMode) {
                    const king = board[position.row][position.col];
                    // Verifica que el rey no se haya movido y no esté en jaque
                    if (
                        king &&
                        !king.hasMoved &&
                        !isKingInCheck(board, "white")
                    ) {
                        // Enroque corto
                        // Verifica condiciones para enroque corto (lado del rey)
                        const rightRook = board[7][7];
                        if (
                            rightRook &&
                            rightRook.type === "rook" &&
                            !rightRook.hasMoved &&
                            !board[7][6] &&
                            !board[7][5] &&
                            !isPositionUnderAttack(
                                board,
                                { row: 7, col: 5 },
                                "white"
                            ) && // Casilla que atraviesa
                            !isPositionUnderAttack(
                                board,
                                { row: 7, col: 6 },
                                "white"
                            ) // Posición final
                        ) {
                            moves.push({ row: 7, col: 6 });
                        }

                        // Enroque largo
                        // Verifica condiciones para enroque largo (lado de la reina)
                        const leftRook = board[7][0];
                        if (
                            leftRook &&
                            leftRook.type === "rook" &&
                            !leftRook.hasMoved &&
                            !board[7][1] &&
                            !board[7][2] &&
                            !board[7][3] &&
                            !isPositionUnderAttack(
                                board,
                                { row: 7, col: 3 },
                                "white"
                            ) && // Casilla que atraviesa
                            !isPositionUnderAttack(
                                board,
                                { row: 7, col: 2 },
                                "white"
                            ) // Posición final
                        ) {
                            moves.push({ row: 7, col: 2 });
                        }
                    }
                }

                return moves;
            },
        },
        black: {
            possibleMoves: (position, board, avoidLoopMode = false) => {
                const moves = [];
                // Movimientos normales del rey
                for (const [dr, dc] of [
                    [-1, 0], // Arriba
                    [1, 0], // Abajo
                    [0, -1], // Izquierda
                    [0, 1], // Derecha
                    [-1, -1], // Diagonal superior izquierda
                    [-1, 1], // Diagonal superior derecha
                    [1, -1], // Diagonal inferior izquierda
                    [1, 1], // Diagonal inferior derecha
                ]) {
                    const r = position.row + dr;
                    const c = position.col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const piece = board[r][c];
                        if (!piece || piece.color !== "black") {
                            moves.push({ row: r, col: c });
                        }
                    }
                }

                // Solo verificar enroque si no estamos en modo evitar bucle
                if (!avoidLoopMode) {
                    const king = board[position.row][position.col];
                    if (
                        king &&
                        !king.hasMoved &&
                        !isKingInCheck(board, "black")
                    ) {
                        // Enroque corto
                        const rightRook = board[0][7];
                        if (
                            rightRook &&
                            rightRook.type === "rook" &&
                            !rightRook.hasMoved &&
                            !board[0][6] &&
                            !board[0][5] &&
                            !isPositionUnderAttack(
                                board,
                                { row: 0, col: 5 },
                                "black"
                            ) && // Casilla que atraviesa
                            !isPositionUnderAttack(
                                board,
                                { row: 0, col: 6 },
                                "black"
                            ) // Posición final
                        ) {
                            moves.push({ row: 0, col: 6 });
                        }

                        // Enroque largo
                        const leftRook = board[0][0];
                        if (
                            leftRook &&
                            leftRook.type === "rook" &&
                            !leftRook.hasMoved &&
                            !board[0][1] &&
                            !board[0][2] &&
                            !board[0][3] &&
                            !isPositionUnderAttack(
                                board,
                                { row: 0, col: 3 },
                                "black"
                            ) && // Casilla que atraviesa
                            !isPositionUnderAttack(
                                board,
                                { row: 0, col: 2 },
                                "black"
                            ) // Posición final
                        ) {
                            moves.push({ row: 0, col: 2 });
                        }
                    }
                }

                return moves;
            },
        },
    },
};

/**
 * Representación Unicode de las piezas de ajedrez.
 * Mapea cada tipo de pieza y color a su símbolo correspondiente.
 */
export const PieceImages: Record<PieceType, Record<PieceColor, string>> = {
    pawn: {
        white: "♙",
        black: "♟",
    },
    rook: {
        white: "♖",
        black: "♜",
    },
    knight: {
        white: "♘",
        black: "♞",
    },
    bishop: {
        white: "♗",
        black: "♝",
    },
    queen: {
        white: "♕",
        black: "♛",
    },
    king: {
        white: "♔",
        black: "♚",
    },
};
