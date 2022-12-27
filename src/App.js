import { useDispatch, useSelector } from "react-redux";
import gameSlice from "./store/gameSlice";
import stageSlice from "./store/stageSlice";
import buildSlice, { changeDirection } from "./store/buildSlice";

import styles from "./app.module.css";

import Header from "./components/UI/Header";
import GameStart from "./components/stages/GameStart";
import RoundStart from "./components/stages/RoundStart";
import Build from "./components/stages/Build/Build";
import Play from "./components/stages/Play/Play";
import Final from "./components/stages/Final";
import { useEffect } from "react";

const App = () => {
  const { round } = useSelector((state) => state.stage);
  const dispatch = useDispatch();
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 68) {
        dispatch(changeDirection());
      }
    }
    document.addEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div
      className="app"
      onKeyDown={(event) => {
        console.log(event);
      }}
    >
      <Header />
      <div className={styles.fields}>
        {round === "start" && <GameStart />}
        {round === "roundStart" && <RoundStart />}
        {round === "build" && <Build />}
        {round === "play" && <Play />}
        {round === "final" && <Final />}
      </div>
    </div>
  );
};

export default App;
