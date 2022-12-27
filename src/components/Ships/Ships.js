import Cell from "../Field/Cell";

import styles from "./Ship.module.css";

const Ship = ({ size }) => {
  let content = [];
  for (let i = 0; i < size; i++) {
    content.push(Cell);
  }
  return (
    <div className={styles.ship}>
      {content.map((c, idx) => (
        <Cell key={idx} id={"selectShip" + idx} />
      ))}
    </div>
  );
};

export default Ship;
