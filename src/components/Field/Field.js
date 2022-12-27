import { useSelector } from "react-redux";

import Cell from "./Cell";

import styles from "./Field.module.css";

const Field = (props) => {
  const { field } = props;

  const content =
    field &&
    field.map((fieldRow, row) =>
      fieldRow.map((fieldCell, col) => {
        let { type } = fieldCell;
        return (
          <Cell
            type={props.hidden ? "" : type}
            key={row + "_" + col}
            id={`${row + 1}_${col + 1}`}
          />
        );
      })
    );
  const colLabel = field.map((item, idx) => (
    <span style={{ width: "20px", textAlign: "center" }}>{idx}</span>
  ));
  const rowLabel = field.map((item, idx) => {
    return (
      <span style={{ width: "20px", textAlign: "center", height: "20px" }}>
        {String.fromCharCode("a".charCodeAt(0) + idx)}
      </span>
    );
  });

  return (
    <div
      className={styles.fieldContainer}
      onMouseOverCapture={(event) => {
        console.log("capture", event.target.id);
      }}
    >
      <div className={styles.rowLabel}>{rowLabel}</div>
      <div className={styles.field}>{content}</div>
      <div className={styles.colLabel}>{colLabel}</div>
      {props.children}
    </div>
  );
};

export default Field;
