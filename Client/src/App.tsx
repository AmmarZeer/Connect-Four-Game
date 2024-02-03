import styles from "./App.module.scss";
import GameBoard from "./components/GameBoard/GameBoard";
function App() {
  return (
    <main className={styles.appContainer}>
      <GameBoard />
    </main>
  );
}

export default App;
