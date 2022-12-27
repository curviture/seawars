import { useSelector } from "react-redux";

import Cell from "../../Field/Cell";

import styles from "./Mask.module.css";

const Mask = (props) => {
  const size = useSelector((state) => state.build.selectedShipSize);
  const currentlyBuildingShipCoordinates = useSelector(
    (state) => state.build.currentlyBuildingShipCoordinates
  );
  let content = (size) => {
    let ct = [];
    for (let i = 0; i < size; i++) {
      ct.push(<Cell type="highlight" />);
    }
    return ct;
  };
  return (
    <div
      id="mask"
      className={styles.mask}
      style={{
        top: currentlyBuildingShipCoordinates.colCoord,
        left: currentlyBuildingShipCoordinates.rowCoord,
      }}
    >
      {content(size)}
    </div>
  );
};

export default Mask;
