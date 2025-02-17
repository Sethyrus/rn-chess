import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { useContext } from "react";
import { GameContext } from "../providers/gameProvider";

export default function GameBoard() {
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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16 }}>
                <Text>No game in progress!</Text>
                <Button title="Start Game" onPress={() => restartGame()} />
            </View>
        );
    }

    const moves = selectedPosition ? availableMoves() : [];

    function handlePress(row: number, col: number) {
        if (!selectedPosition) {
            selectCell({ row, col });
        } else {
            const isMove =
                moves.findIndex((m) => m.row === row && m.col === col) !== -1;
            if (isMove) {
                movePiece({ row, col });
                clearSelection();
            } else {
                selectCell({ row, col });
            }
        }
    }

    return (
        <View style={{ flexDirection: "column" }}>
            {board.map((rowData, rowIndex) => (
                <View style={{ flexDirection: "row" }} key={rowIndex}>
                    {rowData.map((cell, colIndex) => {
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
                                    width: 40,
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    backgroundColor: isSelected
                                        ? "yellow"
                                        : isAvailableMove
                                        ? "lightgreen"
                                        : "white",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {cell.piece && (
                                    <Text>
                                        {cell.piece.color[0].toUpperCase()}
                                        {cell.piece.type[0].toUpperCase()}
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
