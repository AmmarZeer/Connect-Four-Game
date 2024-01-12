import { ReactNode } from "react";
import styles from "./Cell.module.scss";
function Cell(props: { children: ReactNode }) {
  const { children } = props;
  return <div className={styles.cell}>{children}</div>;
}

export default Cell;
