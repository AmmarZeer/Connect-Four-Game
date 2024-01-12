import { useEffect, useRef, useState } from "react";
import BoardColumn from "../BoardColumn/BoardColumn";
import styles from "./GameBoard.module.scss";
import { Players } from "../enums";

const initialBoardData = new Array(7)
  .fill([])
  .map(() => new Array(6).fill(null));

function GameBoard() {
  const [boardData, setBoardData] = useState<Players[][]>(initialBoardData);
  const [currentPlayer, setCurrentPlayer] = useState<Players>(Players.Player1);
  const lastAddedChipPosition = useRef<{ row: number; column: number } | null>(
    null
  );

  function onChipAddition(column: number, cell: number) {
    lastAddedChipPosition.current = { row: cell, column };
  }

  function hasAPlayerWon(winningPlayer: Players): boolean {
    console.log(winningPlayer);
    return false;
  }

  function isTheGameADraw(): boolean {
    return boardData.every((boardColumnData) => boardColumnData[0] !== null);
  }

  useEffect(() => {
    setCurrentPlayer((prev) =>
      prev === Players.Player1 ? Players.Player2 : Players.Player1
    );

    if (hasAPlayerWon(currentPlayer)) {
      console.log("The game is won");
    } else {
      isTheGameADraw();
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
