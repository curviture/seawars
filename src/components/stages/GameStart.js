import { useDispatch, useSelector } from "react-redux";
import { build, play } from "../../store/stageSlice";
import { setPlayers } from "../../store/gameSlice";

import styles from "./GameStart.module.css";
import { useEffect } from "react";

const GameStart = () => {
  const players = useSelector((state) => state.game.players);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPlayers({ players: ["p1", "p2"] }));
  }, [dispatch]);
  return (
    <div className={styles.gameStart}>
      <h1 className={styles.title}>Do you want to start the game?</h1>
      <button
        className={styles.btn}
        onClick={() => {
          dispatch(build());
        }}
      >
        Start
      </button>
    </div>
  );
};

export default GameStart;
