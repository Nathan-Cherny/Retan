"use client";

import boardSettings from "../boardSettings.json";
import { useState, useEffect } from "react";

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Board() {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const settingsCopy = JSON.parse(JSON.stringify(boardSettings));
        const generatedBoard = generateBoard(settingsCopy);
        setBoard(generatedBoard);
    }, []);

    if (!board) {
        return null;
    }

    return <BoardView board={board} />;
}

function BoardView({ board }) {
    return (
        <div className="flex items-center justify-center border-black border-4">
            {board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((tile, tileIndex) => (
                        <div key={tileIndex} className="p-5 border-black border-2">
                            <span>{tile.number}</span>
                            <span>{tile.resource}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function generateBoard(boardSettings) {
    const data = boardSettings.data;
    const size = data.size;

    const board = [];
    for (let row = 0; row < size; row++) {
        const boardRow = [];
        for (let col = 0; col < size; col++) {
            boardRow.push(getRandomTile(data));
        }
        board.push(boardRow);
    }

    return board;
}

function getRandomTile(data) {
    return {
        resource: getRandomResource(data),
        number: getRandomTileNumber(data),
    };
}

function getRandomResource(data) {
    const resources = data.resources;
    const keys = Object.keys(resources);

    let index;
    let chosen;

    do {
        index = getRandomIntInclusive(0, keys.length - 1);
        chosen = keys[index];
    } while (resources[chosen] == 0);

    resources[chosen]--;
    return chosen;
}

function getRandomTileNumber(data) {
    const distribution = data.distribution;

    let index;
    let value;

    do {
        index = getRandomIntInclusive(0, distribution.length - 1);
        value = distribution[index];
    } while (value == 0);

    distribution[index]--;
    return value;
}
