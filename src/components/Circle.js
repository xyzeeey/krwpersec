import styles from "./Circle.module.css";

const Circle = ({ type }) => {
  return (
    <div className={styles.Circle}>
      <div className={[styles.circleElem, styles[type]].join(" ")}></div>
      <div className={[styles.circleElem, styles[type]].join(" ")}></div>
      <div className={[styles.circleElem, styles[type]].join(" ")}></div>
      <div className={[styles.circleElem, styles[type]].join(" ")}></div>
    </div>
  )
}

export default Circle;