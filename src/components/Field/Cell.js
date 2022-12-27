import style from "./Cell.module.css";

const Cell = (props) => {
  const { type, id } = props;

  let backgroundStyle = "";
  if (type === "highlight") {
    backgroundStyle = "blue";
  }
  if (type === "dead") {
    backgroundStyle = "red";
  }
  if (type === "notAllowed") {
    backgroundStyle = "black";
  }
  if (type === "disabled") {
    backgroundStyle = "gray";
  }
  return (
    <div
      className={`${style.cell} ${style[type]}`}
      // style={{ backgroundColor: backgroundStyle }}
      {...(id && { id: id })}
    ></div>
  );
};

export default Cell;
