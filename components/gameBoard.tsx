import React from "react";
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
        selectCell,
        clearSelection,
        availableMoves,
        movePiece,
        restartGame,
    } = useContext(GameContext);

    if (!board) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                <Text>No game in progress!</Text>
                <Button title="Start Game" onPress={() => restartGame()} />
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
            {board.map((rowData, rowIndex) => (
                <View style={{ flexDirection: "row" }} key={rowIndex}>
                    {rowData.map((cell, colIndex) => {
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
                                {cell.piece && (
                                    <Text
                                        style={{ fontSize: cellSize * (2 / 3) }}
                                    >
                                        {
                                            PieceImages[cell.piece.type][
                                                cell.piece.color
                                            ]
                                        }
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
