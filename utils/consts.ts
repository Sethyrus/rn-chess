export const PieceMoves: Record<PieceType, PieceMove> = {
    pawn: {
        white: {
            possibleMoves: (position, board) => {
                const moves = [];
                const [row, col] = [position.row, position.col];
                if (row === 6) {
                    if (!board[row - 1][col].piece) {
                        moves.push({ row: row - 1, col });
                        if (!board[row - 2][col].piece) {
                            moves.push({ row: row - 2, col });
                        }
                    }
                } else {
                    if (!board[row - 1][col].piece) {
                        moves.push({ row: row - 1, col });
                    }
                }
                return moves;
            },
        },
        black: {
            possibleMoves: (position, board) => {
                const moves = [];
                const [row, col] = [position.row, position.col];
                if (row === 1 && !board[row + 1][col].piece) {
                    moves.push({ row: row + 1, col });
                    if (!board[row + 2][col].piece) {
                        moves.push({ row: row + 2, col });
                    }
                } else if (row < 7 && !board[row + 1][col].piece) {
                    moves.push({ row: row + 1, col });
                }
                return moves;
            },
        },
    },
    rook: {
        white: {
            possibleMoves: (position, board) => {
                const moves = [];
                for (const [dr, dc] of [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                ]) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (cell.piece.color !== "white") {
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
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                ]) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (cell.piece.color !== "black") {
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
                const offsets = [
                    [-2, -1],
                    [-2, 1],
                    [2, -1],
                    [2, 1],
                    [-1, -2],
                    [-1, 2],
                    [1, -2],
                    [1, 2],
                ];
                for (const [dr, dc] of offsets) {
                    const r = position.row + dr;
                    const c = position.col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece || cell.piece.color !== "white") {
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
                    [-2, -1],
                    [-2, 1],
                    [2, -1],
                    [2, 1],
                    [-1, -2],
                    [-1, 2],
                    [1, -2],
                    [1, 2],
                ];
                for (const [dr, dc] of offsets) {
                    const r = position.row + dr;
                    const c = position.col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece || cell.piece.color !== "black") {
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
                for (const [dr, dc] of [
                    [1, 1],
                    [1, -1],
                    [-1, 1],
                    [-1, -1],
                ]) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (cell.piece.color !== "white") {
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
                    [1, 1],
                    [1, -1],
                    [-1, 1],
                    [-1, -1],
                ]) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (cell.piece.color !== "black") {
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
                const directions = [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                    [1, 1],
                    [1, -1],
                    [-1, 1],
                    [-1, -1],
                ];
                for (const [dr, dc] of directions) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (cell.piece.color !== "white") {
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
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                    [1, 1],
                    [1, -1],
                    [-1, 1],
                    [-1, -1],
                ];
                for (const [dr, dc] of directions) {
                    let r = position.row + dr;
                    let c = position.col + dc;
                    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (cell.piece.color !== "black") {
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
            possibleMoves: (position, board) => {
                const moves = [];
                for (const [dr, dc] of [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                    [-1, -1],
                    [-1, 1],
                    [1, -1],
                    [1, 1],
                ]) {
                    const r = position.row + dr;
                    const c = position.col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece || cell.piece.color !== "white") {
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
                for (const [dr, dc] of [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                    [-1, -1],
                    [-1, 1],
                    [1, -1],
                    [1, 1],
                ]) {
                    const r = position.row + dr;
                    const c = position.col + dc;
                    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                        const cell = board[r][c];
                        if (!cell.piece || cell.piece.color !== "black") {
                            moves.push({ row: r, col: c });
                        }
                    }
                }
                return moves;
            },
        },
    },
};

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
