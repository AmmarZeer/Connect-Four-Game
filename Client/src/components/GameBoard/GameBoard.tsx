import { useEffect, useRef, useState } from "react";
import BoardColumn from "../BoardColumn/BoardColumn";
import styles from "./GameBoard.module.scss";
import { Players } from "../enums";
import {
  CONSECUTIVE_CHIPS_TO_WIN,
  NUMBER_OF_COLUMNS,
  NUMBER_OF_ROWS,
} from "../constants";
import { ChipPosition } from "../types";

const initialBoardData = new Array(NUMBER_OF_COLUMNS)
  .fill([])
  .map(() => new Array(NUMBER_OF_ROWS).fill(null));
const initialChipPositionRef: ChipPosition = { row: 0, column: 0 };

function GameBoard() {
  const [boardData, setBoardData] = useState<Players[][]>(initialBoardData); // we same the data as array of columns
  const [currentPlayer, setCurrentPlayer] = useState<Players>(Players.Player1);
  const lastAddedChipPosition = useRef<ChipPosition>(initialChipPositionRef);

  function onChipAddition(column: number, cell: number) {
    lastAddedChipPosition.current = { row: cell, column };
  }

  function isHorizontalWin(): boolean {
    let numberOfConsecutiveChips = 0;
    const rowIndexToCheck = lastAddedChipPosition.current.row;

    for (let i = 0; i < NUMBER_OF_COLUMNS; i++) {
      const chip = boardData[i][rowIndexToCheck];
      if (chip === currentPlayer) {
        numberOfConsecutiveChips++;
        if (numberOfConsecutiveChips === CONSECUTIVE_CHIPS_TO_WIN) return true;
      } else {
        numberOfConsecutiveChips = 0;
      }
    }

    return false;
  }

  function isVerticalWin(): boolean {
    let numberOfConsecutiveChips = 0;
    const columnToCheck = boardData[lastAddedChipPosition.current.column];

    for (const chip of columnToCheck) {
      if (chip === currentPlayer) {
        numberOfConsecutiveChips++;
        if (numberOfConsecutiveChips === CONSECUTIVE_CHIPS_TO_WIN) return true;
      } else {
        numberOfConsecutiveChips = 0;
      }
    }

    return false;
  }

  //Go to most available top right cell, then check diagonally from top right to bottom left
  function isRightDiagonalWin(): boolean {
    let numberOfConsecutiveChips = 0;
    const chipColumn = lastAddedChipPosition.current.column;
    const chipRow = lastAddedChipPosition.current.row;

    const differenceWithRightMostColumn = NUMBER_OF_COLUMNS - 1 - chipColumn; // -1 to make the NUMBER_OF_COLUMNS matching the index numbers
    let heighstRowAvailable = chipRow - differenceWithRightMostColumn;
    if (heighstRowAvailable < 0) heighstRowAvailable = 0; // we need to check because the number of columns is greater than the number of rows so buttom left will result in -1 instead of 0

    const furthestColumnAvailable =
      chipColumn + (chipRow - heighstRowAvailable);

    for (
      let row = heighstRowAvailable, col = furthestColumnAvailable;
      row < NUMBER_OF_ROWS && col >= 0;
      row++, col--
    ) {
      if (boardData[col][row] === currentPlayer) {
        numberOfConsecutiveChips++;
        if (numberOfConsecutiveChips === CONSECUTIVE_CHIPS_TO_WIN) return true;
      } else {
        numberOfConsecutiveChips = 0;
      }
    }
    return false;
  }

  //Go to most available top left cell, then check diagonally from top left to bottom right
  function isLeftDiagonalWin(): boolean {
    let numberOfConsecutiveChips = 0;
    const chipColumn = lastAddedChipPosition.current.column;
    const chipRow = lastAddedChipPosition.current.row;

    let heightRowAvailable = chipRow - chipColumn;
    if (heightRowAvailable < 0) heightRowAvailable = 0;
    let furthestColumnAvailable = chipColumn - chipRow - heightRowAvailable;
    if (furthestColumnAvailable < 0) furthestColumnAvailable = 0;

    for (
      let row = heightRowAvailable, col = furthestColumnAvailable;
      row < NUMBER_OF_ROWS && col < NUMBER_OF_COLUMNS;
      row++, col++
    ) {
      if (boardData[col][row] === currentPlayer) {
        numberOfConsecutiveChips++;
        if (numberOfConsecutiveChips === CONSECUTIVE_CHIPS_TO_WIN) return true;
      } else {
        numberOfConsecutiveChips = 0;
      }
    }
    return false;
  }

  function hasAPlayerWon(): boolean {
    return (
      isHorizontalWin() ||
      isVerticalWin() ||
      isRightDiagonalWin() ||
      isLeftDiagonalWin()
    );
  }

  function isTheGameADraw(): boolean {
    return boardData.every((boardColumnData) => boardColumnData[0] !== null);
  }

  useEffect(() => {
    setCurrentPlayer((prev) =>
      prev === Players.Player1 ? Players.Player2 : Players.Player1
    );

    if (hasAPlayerWon()) {
      console.log("The game is won by:", currentPlayer);
      setBoardData(initialBoardData);
    } else if (isTheGameADraw()) {
      console.log("Game is a Draw");
      setBoardData(initialBoardData);
    }
  }, [boardData]);

  return (
    <div className={styles.gameBoard}>
      {boardData.map((columnData, index) => (
        <BoardColumn
          key={index}
          columnNumber={index}
          columnData={columnData}
          setBoardData={setBoardData}
          currentPlayer={currentPlayer}
          onChipAddition={onChipAddition}
        />
      ))}
    </div>
  );
}

export default GameBoard;
