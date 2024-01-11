import { useEffect, useState } from "react";
import BoardColumn from "../BoardColumn/BoardColumn";
import styles from "./GameBoard.module.scss";
import { Players } from "../enums";

const initialBoardData = new Array(7)
  .fill([])
  .map(() => new Array(6).fill(null));

function GameBoard() {
  const [boardData, setBoardData] = useState<Players[][]>(initialBoardData);
  const [currentPlayer, setCurrentPlayer] = useState<Players>(Players.Player1);

  useEffect(() => {
    setCurrentPlayer((prev) =>
      prev === Players.Player1 ? Players.Player2 : Players.Player1
    );
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
        />
      ))}
    </div>
  );
}

export default GameBoard;
