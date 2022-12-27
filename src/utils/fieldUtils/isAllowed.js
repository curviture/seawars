function isFreeAround({ field, row, col }) {
  for (let r = -1; r < 2; r++) {
    for (let c = -1; c < 2; c++) {
      if (
        field[row + r] === undefined ||
        field[row + r][col + c] === undefined
      ) {
        continue;
      }
      if (
        field[row + r][col + c].type !== "" &&
        field[row + r][col + c].type !== "highlight"
      ) {
        return false;
      }
    }
  }
  return true;
}

function getShipCoords({ field, row, col, size, isVertical }) {
  let ship = [];
  if (isVertical) {
    for (let i = 0; i < size; i++) {
      ship.push({
        row: row + i,
        col: col,
        type: field[row + i][col].type,
      });
    }
  } else {
    for (let i = 0; i < size; i++) {
      ship.push({
        row: row,
        col: col + i,
        type: field[row][col + i].type,
      });
    }
  }
  return ship;
}

const isAllowed = ({ field, coord, size, isVertical }) => {
  let { row, col } = coord;
  if (isVertical && row + size > field.length) {
    row = field.length - size - 1;
  }
  if (!isVertical && col + size > field[0].length) {
    col = field[0].length - size - 1;
  }
  let shipsCells = getShipCoords({
    field,
    col,
    row,
    size,
    isVertical,
  });

  return shipsCells.every((shipsCell) => {
    return isFreeAround({
      field,
      row: shipsCell.row,
      col: shipsCell.col,
    });
  });
};

export { getShipCoords };

export default isAllowed;
