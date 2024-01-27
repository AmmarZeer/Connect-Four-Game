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
    const rowIndexToCheck = lastAddedChipPosition.current.row;
    let numberOfConsecutiveChips: number = 0;

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
    const columnToCheck = boardData[lastAddedChipPosition.current.column];
    let numberOfConsecutiveChips: number = 0;

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

  function isRightDiagonalWin(): boolean {
    return false;
  }

  function isLeftDiagonalWin(): boolean {
    return false;
  }

  function hasAPlayerWon(): boolean {
    return isHorizontalWin() || isVerticalWin();
  }

  function isTheGameADraw(): boolean {
    return boardData.every((boardColumnData) => boardColumnData[0] !== null);
  }

  useEffect(() => {
    setCurrentPlayer((prev) =>
      prev === Players.Player1 ? Players.Player2 : Players.Player1
    );

    if (hasAPlayerWon()) {
      console.log("The game is won");
    } else if (isTheGameADraw()) {
      console.log("Game is a Draw");
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
