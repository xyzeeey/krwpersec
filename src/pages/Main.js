import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Circle from "../components/Circle.js";
import SetBtn from "../components/SetBtn.js";
import { setSpend } from "./../store.js";
import styles from "./Main.module.css";

const Main = () => {
  let dispatch = useDispatch();
  
  const localDataSpend = localStorage.getItem('totalSpend');
  if(localDataSpend) {
    dispatch(setSpend(parseInt(localDataSpend)));
  }

  let totalSpend = useSelector(state => state.totalSpend);
  let now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [date, setDate] = useState(now.getDate());
  const fullDate = new Date(year, month - 1, 0).getDate();
  const [hourSec, setHourSec] = useState(now.getHours() * 3600);
  const [minSec, setMinSec] = useState(now.getMinutes() * 60);
  const [sec, setSec] = useState(now.getSeconds());
  const [spendPerSec, setSpendPerSec] = useState((totalSpend / fullDate / 86400));
  const [spendPerDate, setSpendPerDate] = useState((totalSpend / fullDate));
  const [nowSpend, setNowSpend] = useState(((date-1) * spendPerDate) + ((hourSec + minSec + sec) * spendPerSec));
  
  function spendNow() {
    now = new Date();
    setMonth(now.getMonth());
    setHourSec(now.getHours() * 3600);
    setMinSec(now.getMinutes() * 60);
    setSec(now.getSeconds());
    setNowSpend(((date-1) * spendPerDate) + ((hourSec + minSec + sec) * spendPerSec));
  }

  function shareTwitter() {
    const shareUrl = "https://krwpersec.netlify.app"; // 전달할 URL / #: %23 줄바꿈: %0a
    window.open(`https://twitter.com/intent/tweet?text=💸숨만 쉬어도 나가는 돈💸 %0a [1초 마다 ${spendPerSec.toFixed(2) == 0 ? spendPerSec.toFixed(4) : spendPerSec.toFixed(2)}원, 하루에 ${spendPerDate.toLocaleString('ko-KR', {maximumFractionDigits: 0})}원] %0a 내 결과 확인하기 🤑 ${shareUrl} %0a%0a%23숨만쉬어도`);
  }

  useEffect(() => {
    const timeInterval = setInterval(spendNow, 1000);
    return () => clearInterval(timeInterval);
  },[sec]);


  return (
    <div className={styles.Main}>
      <h1 className={styles.title}>숨만 쉬어도</h1>
      <div className={styles.nowSpend}>-{nowSpend.toLocaleString('ko-KR', {maximumFractionDigits: 2})}<span>원</span></div>
      <p className={styles.spendSec}>{spendPerSec.toFixed(2) == 0 ? spendPerSec.toFixed(4) : spendPerSec.toFixed(2)}원 / 1초</p>
      <p className={styles.priod}>{month + 1}월 1일부터 현재 기준</p>
      <div className={styles.circleWrap}>
        {spendPerSec === 0 ? null : <Circle />}
        {spendPerSec === 0 ? null : <p className={styles.spendSecMid}>-{spendPerSec.toFixed(2) == 0 ? spendPerSec.toFixed(4) : spendPerSec.toFixed(2)}KRW</p>}
      </div>
      <div className={styles.btnWrap}>
        <Link to="/edit"><SetBtn text="한달 고정 지출비 설정하기" /></Link>
        <div className={styles.shareBtn} onClick={shareTwitter}><img src={process.env.PUBLIC_URL + `/assets/twitter.png`} alt="twitter" /></div>
      </div>
    </div>
  );
};

export default Main;