import Cell from "../Cell/Cell";
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

  function isColumnValidToAdd(): boolean {
    return columnData[0] === null;
  }

  function handleAddChipToColumn(previousColumnData: Players[]): Players[] {
    const newColumnData = [...previousColumnData];
    for (let i = newColumnData.length - 1; i >= 0; i--) {
      if (newColumnData[i] === null) {
        newColumnData[i] = currentPlayer;
        break;
      }
    }
    return newColumnData;
  }

  function handleAddChipToBoard() {
    if (!isColumnValidToAdd()) return;
    setBoardData((previousData) => {
      const previousColumnData = previousData[columnNumber];
      //new Column needs to be creted so we don't mutate the column in the previousData state object =>because the call back will run twice and we want the object to stay the same in both runs
      const newColumnData = handleAddChipToColumn(previousColumnData);
      return previousData.map((column, columnIndex) => {
        if (columnIndex == columnNumber) return newColumnData;
        return column;
      });
    });
  }

  return (
    <div className={styles.column} onClick={handleAddChipToBoard}>
      {columnData.map((_, cellIndex) => (
        <Cell key={cellIndex}>
          {Boolean(columnData[cellIndex]) && (
            <Chip belongsTo={columnData[cellIndex]} />
          )}
        </Cell>
      ))}
    </div>
  );
}

export default BoardColumn;
