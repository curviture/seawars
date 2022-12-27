import isOutOfBounds from "./isOutOfBounds";

let directions = ["up", "down", "left", "right"];

let vectors = {
  right: ({ row, col }) => {
    return { row, col: col + 1 };
  },
  left: ({ row, col }) => {
    return { row, col: col - 1 };
  },
  up: ({ row, col }) => {
    return { row: row + 1, col };
  },
  down: ({ row, col }) => {
    return { row: row - 1, col };
  },
  lookSides: ({ row, col }) => {
    let dirs = directions.map((d) => {
      return vectors[d]({ row, col });
    });
    return dirs.filter((d) => !isOutOfBounds(d.row, d.col, 10, 10));
  },
  lookAround: ({ row, col }) => {
    let coords = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if ((i === 0 && j === 0) || isOutOfBounds(row + i, col + j, 10, 10))
          continue;
        coords.push({ row: row + i, col: col + j });
      }
    }
    return coords.filter((c) => !isOutOfBounds(c.row, c.col, 10, 10));
  },
};

export { directions };

export default vectors;
