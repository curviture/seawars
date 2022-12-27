import defaultShips from "../data/defaultShips";
import { getShipCoords } from "../utils/fieldUtils/isAllowed";
import isAllowed from "../utils/fieldUtils/isAllowed";
import { compose } from "@reduxjs/toolkit";

function getRandomInt(maxNum = 10) {
  return Math.floor(Math.random() * maxNum);
}

function defaultField(maxRow = 10, maxCol = 10) {
  return Array(10).fill(Array(10).fill({ type: "" }));
}

function fillShips({ field, shipsToFill = defaultShips }) {
  let generatedField = field.slice();
  let shipsLeftToFill = shipsToFill.slice();
  let iter = 0;
  const maxRow = 10;
  const maxCol = 10;

  while (shipsLeftToFill.some((ship) => ship[1] > 0) && iter < 250) {
    iter++;
    let isVertical = getRandomInt(2) % 2 === 0;

    let row = getRandomInt(10);
    let col = getRandomInt(10);
    let size = shipsLeftToFill[getRandomInt(shipsLeftToFill.length)][0];
    if (isVertical) {
      if (row + size > maxRow) {
        row = maxRow - size;
      }
    }
    if (!isVertical) {
      if (col + size > maxCol) {
        col = maxCol - size;
      }
    }
    let ship = getShipCoords({
      field: generatedField,
      row,
      col,
      size,
      isVertical,
    });
    if (
      isAllowed({
        field: generatedField,
        coord: { row, col },
        size,
        isVertical,
      })
    ) {
      ship.forEach((cell) => {
        let { row, col } = cell;
        generatedField[row][col] = { type: "ship" };
      });
      shipsLeftToFill = shipsLeftToFill
        .map((item) => {
          if (item[0] === size) {
            let amount = item[1];
            return [size, amount - 1];
          }
          return item;
        })
        .filter((item) => item[1] !== 0);
    }
  }

  return generatedField;
}

export default fillShips;
