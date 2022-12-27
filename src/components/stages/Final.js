import { useSelector, useDispatch } from "react-redux";

import { start } from "../../store/stageSlice";

import styles from "./Final.module.css";

const Final = () => {
  const winner = useSelector((state) => state.play.winner);
  const dispatch = useDispatch();
  return (
    <div className={styles.Final}>
      <h1 class={styles.mainTitle}>This Round has finished</h1>
      <p class={styles.winnerLabel}>Winner is</p>
      <h2 className={styles.winner}>{winner}</h2>
      <div>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(start());
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Final;
