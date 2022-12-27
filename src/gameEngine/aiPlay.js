import isOutOfBounds from "../utils/common/isOutOfBounds";
import vectors, { directions } from "../utils/common/vectors";
import { randomInt } from "../utils/common/base";

function scanForWoundedShip(field) {
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[row].length; col++) {
      let cell = field[row][col];
      if (cell.type === "dead") {
        let coordsAroundCell = vectors.lookSides({ row, col });
        let isAdjacentCellsWounded = coordsAroundCell.some(
          (c) => field[c.row][c.col].type === "fog"
        );
        if (isAdjacentCellsWounded) {
          return { wounded: true, row, col };
        }
      }
    }
  }
  return { wounded: false, row: null, col: null };
}

function crawlUntil({ field, row, col, direction }) {
  let targetCell = null;
  let coords = { row, col };
  while (
    !isOutOfBounds(coords.row, coords.col, 10, 10) &&
    field[coords.row][coords.col].type === "dead"
  ) {
    coords = vectors[direction]({ row: coords.row, col: coords.col });
    if (
      !isOutOfBounds(coords.row, coords.col, 10, 10) &&
      field[coords.row][coords.col].type === "fog"
    ) {
      targetCell = { row: coords.row, col: coords.col };
      return targetCell;
    }
  }
  return targetCell;
}

function getTargets({ field, row, col }) {
  let typeOfSides = directions.reduce((acc, direction) => {
    let coordOfDirection = vectors[direction]({ row, col });
    let { row: rowOfDirection, col: colOfDirection } = coordOfDirection;
    if (isOutOfBounds(rowOfDirection, colOfDirection, 10, 10)) {
      return acc;
    }

    acc[direction] = field[rowOfDirection][colOfDirection].type;
    return acc;
  }, {});
  let targets = [];
  if (typeOfSides.up === "dead" || typeOfSides.down == "dead") {
    targets.push(
      crawlUntil({ field, row, col, direction: "up" }),
      crawlUntil({ field, row, col, direction: "down" })
    );
  }
  if (typeOfSides.left === "dead" || typeOfSides.right == "dead") {
    targets.push(
      crawlUntil({ field, row, col, direction: "left" }),
      crawlUntil({ field, row, col, direction: "right" })
    );
  }
  return targets.filter((t) => t !== null);
}

function aiPlay(field) {
  let { wounded, row, col } = scanForWoundedShip(field);
  if (wounded) {
    let sidesCoords = vectors.lookSides({ row, col });
    let isOnlyOneCellWounded = sidesCoords
      .map((side) => field[side.row][side.col])
      .every((sideCell) => {
        return sideCell.type !== "dead";
      });
    if (isOnlyOneCellWounded) {
      sidesCoords = sidesCoords.filter(
        (v) => field[v.row][v.col].type === "fog"
      );
      let randomIdx = randomInt(sidesCoords.length);
      return sidesCoords[randomIdx];
    }
    let t = getTargets({ field, row, col }).filter(
      (t) => field[t.row][t.col].type === "fog"
    );
    return t[randomInt(t.length)];
  }
  let randomRow = Math.floor(Math.random() * field.length);
  let randomCol = Math.floor(Math.random() * field[0].length);
  while (field[randomRow][randomCol].type !== "fog") {
    randomCol = randomInt(10);
    randomRow = randomInt(10);
  }
  return {
    row: randomRow,
    col: randomCol,
  };
}

export default aiPlay;
