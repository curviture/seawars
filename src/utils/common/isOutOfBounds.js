const isOutOfBounds = (row, col, maxRow = 10, maxCol) => {
  maxCol = maxCol === undefined ? maxRow : maxCol;
  let res = row >= maxRow || col >= maxCol || row < 0 || col < 0;
  return res;
};

export default isOutOfBounds;
