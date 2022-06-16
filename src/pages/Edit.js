import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "../components/AddItem.js";
import SpendList from "../components/SpendList.js";
import SetBtn from "../components/SetBtn.js"
import { setItem, setSpend } from "./../store.js";
import styles from "./Edit.module.css";
import { Link } from "react-router-dom";

const Edit = () => {
  let spendItem = useSelector(state => state.spendItem);
  let totalSpend = useSelector(state => state.totalSpend);
  let dispatch = useDispatch();
  const [addItemShown, setAddItemShown] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  
  function onAddItem() {
    setAddItemShown(current => !current);
  }

  function toastMsg() {
    setToastShown(current => true);
  }

  useEffect(()=>{
    const localDataItem = localStorage.getItem('spendItem');
    if(localDataItem) {
      dispatch(setItem(JSON.parse(localDataItem)));
    }
  },[]);

  useEffect(()=> {
    const localDataSpend = localStorage.getItem('totalSpend');
    if(localDataSpend) {
      dispatch(setSpend(parseInt(localDataSpend)));
    }
  },[]);

  useEffect(()=>{
    const toastTimer = setTimeout(() => {
      setToastShown(current => false);
    }, 500);
    return () => clearTimeout(toastTimer);
  },[toastShown])

  
  return (
    <div className={styles.Edit}>
      <div className={styles.listWrap}>
        <p className={styles.title}>한달 고정 지출비</p>
        <div className={styles.totalSpend}>{totalSpend.toLocaleString('ko-KR')}<span>원</span></div>

        {spendItem.map((item, idx) => {
          return (
            <SpendList item={item} idx={idx} key={idx}/>
          )
        })}
      </div>
      { addItemShown ? <div className={styles.coverArea} onClick={onAddItem}></div> : null }
      { toastShown ? <div className={styles.toastMsg}>고정 지출을 추가해주세요</div> : null }
      <div className={styles.btnWrap}>
        <Link to={!totalSpend ? "#" : "/main"}>
          <SetBtn style="resultBtn" text="결과 확인하기" onClick={!totalSpend ? toastMsg : null}/>
        </Link>
        <SetBtn text="고정 지출 추가하기" onClick={onAddItem} />
      </div>
      { addItemShown ? <AddItem /> : null }
      
    </div>
  );
};

export default Edit;