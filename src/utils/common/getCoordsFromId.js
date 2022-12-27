function getCoordFromId(id) {
  const rowId = id.match(/^\d{1,2}/i)[0] - 1;
  const colId = id.match(/\d{1,2}$/i)[0] - 1;
  return { row: rowId, col: colId };
}

export default getCoordFromId;
