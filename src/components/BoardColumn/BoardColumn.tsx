import Chip from "../Chip/Chip";
import { Players } from "../enums";
import styles from "./BoardColumn.module.scss";
interface IBoardColumnProps {
  columnNumber: number;
  columnData: Players[];
  setBoardData: React.Dispatch<React.SetStateAction<Players[][]>>;
  currentPlayer: Players;
}
function BoardColumn(props: IBoardColumnProps) {
  const { columnNumber, columnData, setBoardData, currentPlayer } = props;
  return (
    <div className={styles.column}>
      {columnData.map((_, cellIndex) => (
        <div
          key={cellIndex}
          className={styles.cell}
          onClick={() =>
            setBoardData((prev) =>
              prev.map((currentColumn, currentColumnIndex) => {
                if (currentColumnIndex === columnNumber) {
                  currentColumn[cellIndex] = currentPlayer;
                }
                return currentColumn;
              })
            )
          }
        >
          {Boolean(columnData[cellIndex]) && (
            <Chip belongsTo={columnData[cellIndex]} />
          )}
        </div>
      ))}
    </div>
  );
}
export default BoardColumn;
