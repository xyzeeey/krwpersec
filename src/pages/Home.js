import { Link } from "react-router-dom";
import Circle from "../components/Circle.js";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.homeWrap}>
        <h1>숨만 쉬어도<br />나가는 돈</h1>
        <div className={styles.circleWrap}>
          <Circle type="white" />
        </div>
        <p>고정 지출비 설정하고</p>
        <Link to="/edit">
        <div className={styles.enterBtn}><span>얼마인지 확인하기</span><span className={styles.next}></span></div>
        </Link>
      </div>
    </div>
  );
};

export default Home;