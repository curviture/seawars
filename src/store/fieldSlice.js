import { createSlice } from "@reduxjs/toolkit";
import isShipOnFieldDead, {
  getHitShipInfo,
} from "../gameEngine/isShipOnFieldDead";
import getCoordFromId from "../utils/common/getCoordsFromId";
import vectors from "../utils/common/vectors";
import isAllowed from "../utils/fieldUtils/isAllowed";

const fieldSlice = createSlice({
  name: "field",
  initialState: {
    fields: {},
  },
  reducers: {
    initField: (state, action) => {
      let { players } = action.payload;
      let emptyField = [];
      for (let i = 0; i < 10; i++) {
        let row = [];
        for (let j = 0; j < 10; j++) {
          row.push({ type: "" });
        }
        emptyField[i] = row;
      }
      let fields = state.fields;
      for (let player of players) {
        fields[player] = emptyField.slice();
      }
      state.fields = fields;
    },
    setField: (state, action) => {
      let player = action.payload.player;
      let fields = state.fields;
      fields = Object.assign(fields, { [player]: action.payload.field });
      state.fields = fields;
    },
    hoverShipOverField: (state, action) => {
      const {
        hoverId,
        selectedShipSize: size,
        isVertical,
        player,
      } = action.payload;
      const { row, col } = getCoordFromId(hoverId);
      let field = state.fields[player];

      if (isVertical) {
        field = field.map((fieldRow, rowIdx) => {
          return fieldRow.map((cell, colIdx) => {
            let { type } = cell;
            if (type !== "highlight" && type !== "") {
              return { type };
            }
            if (type === "highlight") {
              type = "";
            }
            if (rowIdx >= row && row + size > rowIdx && col === colIdx) {
              return { type: "highlight" };
            }
            if (
              row + size > field.length &&
              field.length - size <= rowIdx &&
              colIdx === col
            ) {
              return { type: "highlight" };
            }

            return { type };
          });
        });
      } else {
        field = field.map((fieldRow, rowIdx) => {
          return fieldRow.map((cell, colIdx) => {
            let { type } = cell;
            if (type !== "highlight" && type !== "") {
              return { type };
            }
            if (type === "highlight") {
              type = "";
            }
            if (rowIdx == row && col + size > colIdx && colIdx >= col) {
              return { type: "highlight" };
            }
            if (
              col + size > field[0].length &&
              field[0].length - size <= colIdx &&
              row === rowIdx
            ) {
              return { type: "highlight" };
            }
            return { type };
          });
        });
      }

      state.fields[player] = field;
    },
    resetHighlightOnField: (state, action) => {
      let field = state.fields[action.payload.player];
      field = field.map((row) =>
        row.map((cell) => {
          if (cell.type === "highlight") {
            cell.type = "";
          }
          return cell;
        })
      );
      state.fields["p1"] = field;
    },
    putShipIntoField: (state, action) => {
      let { selectedShipSize: size, id, player, isVertical } = action.payload;
      let field = state.fields[player].slice();
      let { row, col } = getCoordFromId(id);

      if (
        isVertical &&
        isAllowed({
          field,
          coord: { row, col },
          size,
          isVertical: true,
        })
      ) {
        field = field.map((fieldRow, rowIdx) => {
          return fieldRow.map((cell, colIdx) => {
            let type = cell.type;
            if (rowIdx >= row && rowIdx < row + size && colIdx === col) {
              type = "ship";
            }
            if (
              row + size > field.length &&
              field.length - size <= rowIdx &&
              colIdx === col
            ) {
              type = "ship";
            }
            return { type };
          });
        });
      }
      if (
        !isVertical &&
        isAllowed({ field, coord: { row, col }, size, isVertical: false })
      ) {
        field = field.map((fieldRow, rowIdx) => {
          return fieldRow.map((cell, colIdx) => {
            let type = cell.type;
            if (colIdx >= col && colIdx < col + size && rowIdx === row) {
              type = "ship";
            }
            if (
              col + size > field[0].length &&
              field[0].length - size <= colIdx &&
              rowIdx === row
            ) {
              type = "ship";
            }
            return { type };
          });
        });
      }

      state.fields[player] = field;
    },
    hit: (state, action) => {
      const { row, col, player } = action.payload;
      let playerField = state.fields[player];
      if (playerField[row][col].type === "ship") {
        playerField[row][col].type = "dead";
        let field = state.fields[player];
        if (isShipOnFieldDead({ field: state.fields[player], row, col })) {
          let { ship } = getHitShipInfo({
            field: state.fields[player],
            row,
            col,
          });
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
                field[cell.row][cell.col].type = "notAllowed";
              });
          });
        }
      }
      if (playerField[row][col].type === "") {
        playerField[row][col].type = "miss";
      }
    },
  },
});

export const {
  initField,
  setField,
  putShipIntoField,
  hoverShipOverField,
  resetHighlightOnField,
  hit,
} = fieldSlice.actions;

export default fieldSlice.reducer;
