import { useSelector } from "react-redux";

import styles from "./Score.module.css";

const Score = (props) => {
  const score = useSelector((state) => state.play.score);
  let scoreContent = Object.keys(score).map((p) => (
    <div key={p} className={styles.playerScore}>
      <span className={styles.player}>{p}</span>
      <span className={styles.playerScoreNumber}>{score[p]}</span>
    </div>
  ));

  return <div className={styles.score}>{scoreContent}</div>;
};

export default Score;
