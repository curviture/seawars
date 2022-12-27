import Ship from "../../../Ships/Ships";

import styles from "./ShipSelection.module.css";

import defaultShips from "../../../../data/defaultShips";

import { useSelector, useDispatch } from "react-redux";
import { selectShip } from "../../../../store/buildSlice";

const ShipSelection = () => {
  const selectedShipSize = useSelector((state) => state.build.selectedShipSize);
  const shipsToBuild = useSelector((state) => state.build.shipsToBuild);
  const dispatch = useDispatch();
  return (
    <div>
      {shipsToBuild.map((ship, idx) => {
        return (
          <div
            key={idx}
            className={`${styles.ship} ${styles.fullWidth} ${
              selectedShipSize == ship[0] ? styles.selectedShip : ""
            }`}
            onClick={() => {
              dispatch(selectShip(ship[0]));
            }}
          >
            <Ship size={ship[0]} />
            <span className={styles.shipAmountLabel}>{ship[1]}</span>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default ShipSelection;
