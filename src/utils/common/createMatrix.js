function createMatrix(w = 10, h = 10, fill = { type: "" }) {
  let m = [];
  for (let i = 0; i < w; i++) {
    let c = [];
    for (let j = 0; j < h; j++) {
      c.push(fill);
    }
    m.push(c);
  }
  return m;
}

export default createMatrix;
