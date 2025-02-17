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

type CellPosition = {
    row: number;
    col: number;
};

type GameCell = {
    position: CellPosition;
    piece: Piece | null;
};

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
