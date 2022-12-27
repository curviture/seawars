import { useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hit, initField } from "../../../store/fieldSlice";
import { final, start } from "../../../store/stageSlice";
import {
  hitOpponentField,
  switchPlayer,
  setWinner,
} from "../../../store/playSlice";

import { randomInt } from "../../../utils/common/base";
import defaultShips from "../../../data/defaultShips";

import getCoordFromId from "../../../utils/common/getCoordsFromId";
import aiPlay from "../../../gameEngine/aiPlay";

import Score from "./Score";
import Field from "../../Field/Field";

import styles from "./Play.module.css";

const Play = () => {
  const dispatch = useDispatch();
  const playerTurn = useSelector((state) => state.play.playerTurn);
  const fields = useSelector((state) => state.field.fields);
  const players = useSelector((state) => state.game.players);
  const score = useSelector((state) => state.play.score);
  const shipsToBuild = useSelector((state) => state.build.shipsToBuild);
  const targetScore = useMemo(() => {
    let sum = defaultShips.reduce((sum, ships) => {
      console.log(sum, ships[0], ships[1]);
      return sum + ships[0] * ships[1];
    }, 0);
    return sum;
  }, [defaultShips]);
  useEffect(() => {
    if (playerTurn === null) {
      const playerTurnAtStart = players[randomInt(players.length)];
      dispatch(switchPlayer(playerTurnAtStart));
    }
    if (playerTurn === "p2") {
      let a = aiPlay(oppositionFields["p1"]);
      let cell = fields["p1"][a.row][a.col];
      if (cell.type === "" || cell.type === "ship") {
        dispatch(
          hitOpponentField({
            player: "p1",
            row: a.row,
            col: a.col,
            field: fields["p1"],
          })
        );
        dispatch(hit({ player: "p1", col: a.col, row: a.row }));
      }
      if (cell.type === "" || cell.type === "dead") {
        dispatch(switchPlayer("p1"));
      }
    }
  }, [playerTurn, fields["p1"]]);

  useEffect(() => {
    let winner;
    console.log(score.p1, score.p1, targetScore, score.p1 === targetScore);
    if ([+score.p1, +score.p2].some((score) => score === targetScore)) {
      winner = score.p1 === targetScore ? "p1" : "p2";

      dispatch(setWinner(winner));
      dispatch(final());
    }
  }, [score.p1, score.p2]);
  const oppositionFields = useSelector(
    (state) => state.play.fieldsForOpponents
  );
  const fieldClickHandler = (event, payload) => {
    if (playerTurn === "p1") {
      if (!event.target.id) {
        return false;
      }
      let { row, col } = getCoordFromId(event.target.id);
      let targetCellType = fields.p2[row][col].type;
      if (targetCellType === "ship" || targetCellType === "") {
        dispatch(
          hitOpponentField({ player: "p2", row, col, field: fields["p2"] })
        );
        dispatch(hit({ row, col, player: "p2" }));
      }
      if (targetCellType === "") {
        dispatch(switchPlayer(playerTurn == "p1" ? "p2" : "p1"));
      }
      if (targetCellType !== "" && targetCellType !== "ship") {
        return false;
      }
    }
  };

  return (
    <div>
      <div className={styles.info}>
        <h2 className={styles.turnInfo}>
          Player To Make a Turn <span>{playerTurn}</span>
        </h2>
        <div>
          <Score />
        </div>
      </div>
      <div className={styles.fieldsContainer}>
        <div
          onClickCapture={(event) => {
            fieldClickHandler(event, { player: "p1" });
          }}
          className={styles.fieldContainer}
        >
          <Field player={"p1"} field={fields.p1} />
        </div>
        {oppositionFields.p2 && (
          <div
            onClickCapture={(event) => {
              fieldClickHandler(event, { player: "p2" });
            }}
            className={styles.fieldContainer}
          >
            <Field player={"p2"} hidden={false} field={oppositionFields.p2} />
          </div>
        )}
      </div>
      <div class={styles.newGameBox}>
        <button className={styles.btn} onClick={() => dispatch(start())}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default Play;
