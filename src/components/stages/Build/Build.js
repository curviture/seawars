import { useDispatch, useSelector } from "react-redux";
import { play } from "../../../store/stageSlice";
// import gameSlice, { generateFieldForComputer } from "../../../store/gameSlice";
import buildSlice, {
  clearShips,
  fieldHoverWhenBuilding,
  placeShipWhenBuilding,
  resetShips,
} from "../../../store/buildSlice";
import fieldSlice, {
  initField,
  putShipIntoField,
  resetHighlightOnField,
  setField,
} from "../../../store/fieldSlice";

import { initFieldsForOpponents, setScore } from "../../../store/playSlice";

import playSlice from "../../../store/playSlice";

import { useCallback, useEffect, useState } from "react";

import Field from "../../Field/Field";

import styles from "./Build.module.css";

import ShipSelection from "./ShipSelection/ShipSelection";
import { hoverShipOverField } from "../../../store/fieldSlice";
import isAllowed from "../../../utils/fieldUtils/isAllowed";
import getCoordFromId from "../../../utils/common/getCoordsFromId";

import fillShips from "../../../gameEngine/fillShips";
import defaultShips from "../../../data/defaultShips";
import createMatrix from "../../../utils/common/createMatrix";

const Build = () => {
  const dispatch = useDispatch();
  const {
    currentlyBuildingCellId: hoverId,
    shipsToBuild,
    selectedShipSize,
    isVertical,
  } = useSelector((state) => state.build);
  const [startBuild, setStartBuild] = useState(false);

  let players = useSelector((state) => state.game.players);
  let fields = useSelector((state) => state.field.fields);

  useEffect(() => {
    if (startBuild) {
      if (selectedShipSize != null && hoverId) {
        dispatch(
          hoverShipOverField({
            hoverId,
            selectedShipSize,
            isVertical,
            player: "p1",
          })
        );
      }
    }
  }, [dispatch, hoverId, isVertical, selectedShipSize]);

  const buildClickHandler = () => {
    dispatch(initField({ players }));
    setStartBuild(true);
  };
  const generatedFieldHandler = (player) => {
    dispatch(
      setField({
        field: fillShips({
          field: createMatrix(10, 10, { type: "" }),
          shipToBuild: defaultShips,
        }),
        player: player,
      })
    );
    if (player == "p1") {
      dispatch(clearShips());
    }
  };
  const resetFieldHandler = (player) => {
    if (player == "p1") {
      dispatch(resetShips());
      dispatch(
        setField({ player: "p1", field: createMatrix(10, 10, { type: "" }) })
      );
    }
  };
  const changeStageToPlayHandler = () => {
    let amountCellsToBuild = defaultShips.reduce((sum, item) => {
      return sum + item[1] * item[0];
    }, 0);
    let arePlayersFieldsGenerated = Object.keys(fields).every((player) => {
      let field = fields[player];
      let amountCellsInField = field.reduce(
        (sum, row) =>
          sum +
          row.reduce((rowSum, cell) => {
            if (cell.type === "ship") {
              rowSum++;
            }
            return rowSum;
          }, 0),
        0
      );
      return amountCellsToBuild === amountCellsInField;
    });
    if (arePlayersFieldsGenerated) {
      players.forEach((p) => {
        dispatch(setScore({ player: p, playerScore: 0 }));
        dispatch(initFieldsForOpponents({ players: players }));
      });

      dispatch(play());
    }
  };

  return (
    <div className={styles.build}>
      {startBuild && (
        <div className={styles.buildFieldsContainer}>
          <div className={styles.buildFieldContainer}>
            <div
              className={styles.mb}
              onMouseOverCapture={(event) => {
                dispatch(
                  fieldHoverWhenBuilding({ id: event.target.id, player: "p1" })
                );
              }}
              onMouseOutCapture={(event) => {
                dispatch(resetHighlightOnField({ player: "p1" }));
                dispatch(fieldHoverWhenBuilding(""));
              }}
              onClickCapture={(event) => {
                const id = event.target.id;
                if (
                  selectedShipSize &&
                  shipsToBuild.filter(
                    (shipToBuild) => shipToBuild[0] == selectedShipSize
                  )[0][1] != 0 &&
                  isAllowed({
                    field: fields["p1"],
                    coord: getCoordFromId(id),
                    size: selectedShipSize,
                    isVertical,
                  })
                ) {
                  dispatch(placeShipWhenBuilding());
                  dispatch(
                    putShipIntoField({
                      id,
                      selectedShipSize: selectedShipSize,
                      player: "p1",
                      isVertical,
                    })
                  );
                }
              }}
            >
              <Field player={"p1"} field={fields.p1} />
            </div>
            <div>
              <ShipSelection />
              <div className={styles.action}>
                <button
                  className={styles.btnPrimary}
                  onClick={() => {
                    generatedFieldHandler("p1");
                  }}
                >
                  Generate
                </button>
                <button
                  className={styles.btnPrimary}
                  onClick={() => {
                    resetFieldHandler("p1");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className={styles.buildFieldContainer}>
            <div>
              <Field player={"p2"} hidden={true} field={fields.p2} />
            </div>
            <div className={styles.action}>
              <button
                className={styles.btnPrimary}
                onClick={(event) => {
                  generatedFieldHandler("p2");
                }}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <button
          className={styles.btnPrimary}
          onClick={buildClickHandler}
          disabled={startBuild}
        >
          Build
        </button>
        {startBuild && (
          <button
            className={styles.btnPrimary}
            onClick={(event) => {
              changeStageToPlayHandler();
            }}
          >
            Play
          </button>
        )}
      </div>
    </div>
  );
};

export default Build;
