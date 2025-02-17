type PieceColor = "white" | "black";

type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";

type PieceMove = Record<
    PieceColor,
    {
        possibleMoves: (
            position: CellPosition,
            board: GameBoard
        ) => CellPosition[];
    }
>;

type Piece = {
    type: PieceType;
    color: PieceColor;
    hasMoved?: boolean;
};

type HistoryStep = {
    movedPiece: Piece;
    capturedPiece: Piece | null;
    from: CellPosition;
    to: CellPosition;
};

type CellPosition = {
    row: number;
    col: number;
};

type GameCell = Piece | null;

type Game = {
    cells: [
        [
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell
        ],
        [
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell
        ],
        [
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell
        ],
        [
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell
        ],
        [
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell
        ],
        [
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell
        ],
        [
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell
        ],
        [
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell,
            GameCell
        ]
    ];
    currentPlayer: PieceColor;
    selectedCell: CellPosition | null;
};

type GameBoard = [
    [
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell
    ],
    [
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell
    ],
    [
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell
    ],
    [
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell
    ],
    [
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell
    ],
    [
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell
    ],
    [
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell
    ],
    [
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell,
        GameCell
    ]
];
