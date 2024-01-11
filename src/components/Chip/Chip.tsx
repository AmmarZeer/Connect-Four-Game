import { Players } from "../enums";
import styles from "./Chip.module.scss";
interface IChipProps {
  belongsTo: Players;
}
function Chip(props: IChipProps) {
  const { belongsTo } = props;
  return <div className={`${styles.chip} ${styles[belongsTo]}`}></div>;
}

export default Chip;
