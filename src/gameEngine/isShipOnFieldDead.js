import vectors, { directions } from "../utils/common/vectors";
import isOutOfBounds from "../utils/common/isOutOfBounds";

const isShip = (cell) => cell && (cell.type === "ship" || cell.type === "dead");

const getHitShipInfo = ({ field, row, col }) => {
  let isDead = true;
  let ship = [{ row, col }];

  directions.forEach((direction) => {
    let dCoords = vectors[direction]({ row, col });
    let iter = 0;
    while (
      !isOutOfBounds(dCoords.row, dCoords.col, 10, 10) &&
      field[dCoords.row][dCoords.col].type === "dead" &&
      isDead
    ) {
      ship.push({ row: dCoords.row, col: dCoords.col });
      dCoords = vectors[direction]({ row: dCoords.row, col: dCoords.col });
    }
    if (
      !isOutOfBounds(dCoords.row, dCoords.col, 10, 10) &&
      field[dCoords.row][dCoords.col].type === "ship"
    ) {
      isDead = false;
    }
  });
  return { isDead, ship };
};

const isShipOnFieldDead = ({ field, row, col }) => {
  return getHitShipInfo({ field, row, col }).isDead;
};

export { getHitShipInfo };

export default isShipOnFieldDead;
