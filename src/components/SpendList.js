import { useDispatch } from "react-redux";
import {removeItem, removePrice } from "./../store.js";
import styles from "./SpendList.module.css";

const SpendList = ({ item }) => {
  let dispatch = useDispatch();

  return (
    <div className={styles.SpendList}>
      <div className={styles.spendItem}>{item.item}</div>
      <div className={styles.spendPrice}>{item.price.toLocaleString('ko-KR')}원</div>
      <div className={styles.spendDelBtn} onClick={() => {
        dispatch(removeItem(item.id));
        dispatch(removePrice(item.price));
      }}><span></span></div>
    </div>
  )
}

export default SpendList;