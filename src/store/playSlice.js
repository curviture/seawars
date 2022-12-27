import { createSlice } from "@reduxjs/toolkit";
import isShipOnFieldDead, {
  getHitShipInfo,
} from "../gameEngine/isShipOnFieldDead";
import createMatrix from "../utils/common/createMatrix";
import isOutOfBounds from "../utils/common/isOutOfBounds";
import vectors from "../utils/common/vectors";

const playSlice = createSlice({
  name: "play",
  initialState: {
    playerTurn: null,
    score: { p1: 0, p2: 0 },
    fieldsForOpponents: {},
  },
  reducers: {
    initFieldsForOpponents(state, action) {
      let { players } = action.payload;
      let fields = players.reduce((acc, p) => {
        acc[p] = createMatrix(10, 10, { type: "fog" });
        return acc;
      }, {});
      state.fieldsForOpponents = fields;
    },
    setScore: (state, action) => {
      const { player, playerScore } = action.payload;
      state.score[player] = playerScore;
    },
    switchPlayer: (state, action) => {
      state.playerTurn = action.payload;
    },
    hitOpponentField: (state, action) => {
      const { player, field, row, col } = action.payload;
      let fieldForOpponent = state.fieldsForOpponents[player];
      if (field[row][col].type == "ship") {
        fieldForOpponent[row][col].type = "dead";
        let score = state.score;
        if (player === "p2") {
          score["p1"] = score["p1"] + 1;
        } else {
          score["p2"] = score["p2"] + 1;
        }
        state.score = score;

        if (isShipOnFieldDead({ field, row, col })) {
          let { ship } = getHitShipInfo({ field, row, col });
          ship.forEach((cell) => {
            vectors
              .lookAround({ row: cell.row, col: cell.col })
              .map((v) => {
                let f = field[v.row][v.col];
                return { type: f.type, row: v.row, col: v.col };
              })
              .filter((cell) => {
                return cell.type === "" || cell.type === "miss";
              })
              .forEach((cell) => {
                fieldForOpponent[cell.row][cell.col].type = "notAllowed";
              });
          });
        }
      }
      if (field[row][col].type == "") {
        fieldForOpponent[row][col].type = "miss";
      }
      state.fieldsForOpponents[player] = fieldForOpponent;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
});

export const {
  switchPlayer,
  setScore,
  initFieldsForOpponents,
  hitOpponentField,
  setWinner,
} = playSlice.actions;

export default playSlice.reducer;
