import styles from "./Circle.module.css";

const Circle = () => {
  return (
    <div className={styles.Circle}>
      <div className={styles.circleElem}></div>
      <div className={styles.circleElem}></div>
      <div className={styles.circleElem}></div>
      <div className={styles.circleElem}></div>
    </div>
  )
}

export default Circle;