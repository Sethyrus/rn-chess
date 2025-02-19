import React, { useMemo } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    useWindowDimensions,
} from "react-native";
import { useContext } from "react";
import { GameContext } from "../providers/gameProvider";
import { PieceImages } from "@/utils/consts";

export default function GameBoard() {
    const dimensions = useWindowDimensions();
    const cellSize = Math.min(dimensions.width, dimensions.height) / 8 - 8;

    const {
        board,
        selectedPosition,
        gameHistory,
        selectCell,
        clearSelection,
        availableMoves,
        movePiece,
        restartGame,
    } = useContext(GameContext);

    const currentTurn = useMemo(() => {
        const lastMove = gameHistory[gameHistory.length - 1];
        return lastMove?.movedPiece.color === "white" ? "black" : "white";
    }, [gameHistory]);

    if (!board) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 24,
                }}
            >
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                    aGedrez
                </Text>
                <Button title="Iniciar partida" onPress={() => restartGame()} />
            </View>
        );
    }

    const moves = availableMoves();

    function handlePress(row: number, col: number) {
        if (!selectedPosition) {
            selectCell({ row, col });
        } else {
            if (selectedPosition.row === row && selectedPosition.col === col) {
                clearSelection();
            } else {
                const isMove =
                    moves.findIndex((m) => m.row === row && m.col === col) !==
                    -1;
                if (isMove) {
                    movePiece({ row, col });
                    clearSelection();
                } else {
                    selectCell({ row, col });
                }
            }
        }
    }

    return (
        <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "column" }}>
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: "center",
                    }}
                >
                    Juegan
                </Text>
                <Text
                    style={{
                        fontSize: 24,
                        textAlign: "center",
                        marginBottom: 20,
                    }}
                >
                    {currentTurn === "white" ? "BLANCAS" : "NEGRAS"}
                </Text>
            </View>
            {board.map((rowData, rowIndex) => (
                <View style={{ flexDirection: "row" }} key={rowIndex}>
                    {rowData.map((piece, colIndex) => {
                        const defaultColor =
                            (rowIndex + colIndex) % 2 === 0
                                ? "#f0d9b5"
                                : "#b58863";
                        const isSelected =
                            selectedPosition &&
                            selectedPosition.row === rowIndex &&
                            selectedPosition.col === colIndex;
                        const isAvailableMove =
                            moves.findIndex(
                                (m) => m.row === rowIndex && m.col === colIndex
                            ) !== -1;

                        return (
                            <TouchableOpacity
                                key={colIndex}
                                onPress={() => handlePress(rowIndex, colIndex)}
                                style={{
                                    width: cellSize,
                                    height: cellSize,
                                    backgroundColor: isSelected
                                        ? "yellow"
                                        : isAvailableMove
                                        ? "lightgreen"
                                        : defaultColor,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {piece && (
                                    <Text
                                        style={{ fontSize: cellSize * (2 / 3) }}
                                    >
                                        {PieceImages[piece.type][piece.color]}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}
