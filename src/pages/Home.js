import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.homeWrap}>
        <h1>숨만 쉬어도<br />나가는 돈<br />얼마일까?
          <figure className={styles.homeImg}>
            <img src={process.env.PUBLIC_URL + `/assets/home.png`} srcSet={process.env.PUBLIC_URL + `/assets/home@2x.png`} alt="money" />
          </figure>
        </h1>
        <p>고정 지출비 설정하고</p>
        <Link to="/edit">
        <div className={styles.enterBtn}><span>확인하기</span><span className={styles.next}></span></div>
        </Link>
      </div>
    </div>
  );
};

export default Home;