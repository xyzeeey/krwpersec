import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem, addPrice } from "./../store.js";
import styles from "./AddItem.module.css";

const AddItem = () => {
  const itemInput = useRef();
  const priceInput = useRef();
  const dispatch = useDispatch();

  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [isWarn, setIsWarn] = useState("#000");
  const [toastShown, setToastShown] = useState(false);

  useEffect(()=>{
    const toastTimer = setTimeout(() => {
      setToastShown(current => false);
    }, 1000);
    return () => clearTimeout(toastTimer);
  },[toastShown])
  
  function nameChange(e) {
    setInputName(e.target.value);
  }

  function priceChange(e) {
    setInputPrice(parseInt(e.target.value));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (1000 > inputPrice || inputPrice > 100000000) {
      setInputPrice("");
      setIsWarn("#ff3b53");
      return;
    }
    let item = {id: Date.now(), item: inputName, price: inputPrice};
    dispatch(addItem(item));
    dispatch(addPrice(item.price));
    setToastShown(current => true);
    setInputName("");
    setInputPrice("");
    setIsWarn("#000");
    itemInput.current.focus();
  }


  return (
    <div className={styles.AddItem}>
      <form onSubmit={onSubmit}>
        <p className={styles.title}>고정 지출비 추가하기</p>
        <div className={styles.nameWrap}>
          <label htmlFor="spendName">지출 이름</label>
          <input
            id="spendName"
            maxLength="10"
            type="text"
            ref={itemInput}
            value={inputName}
            onChange={nameChange}
            placeholder="월세, 넷플릭스 구독"
            required
          />
        </div>
        <div className={styles.priceWrap}>
          <label htmlFor="spendPrice">지출 금액</label>
          <input
            id="spendPrice"
            type="number"
            inputMode="numeric"
            ref={priceInput}
            value={inputPrice}
            onChange={priceChange}
            placeholder="숫자 (단위: 원)"
            required
          />
        </div>
        <p className={styles.valiText} style={{color: isWarn}}>1,000원 이상 100,000,000원 이하</p>
        <button className={styles.addBtn}>추가하기</button>
      </form>
      { toastShown ? <div className={styles.toastMsg}>추가 완료</div> : null }
    </div>
  )
}

export default AddItem;