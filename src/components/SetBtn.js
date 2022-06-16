import styles from "./SetBtn.module.css";

const SetBtn = ({ text, styleName, bgcolor, onClick }) => {
  return (
    <div className={[styles.SetBtn, styles[styleName]].join(" ")} onClick={onClick} style={{backgroundColor: bgcolor}}>
      <div>{text}</div>
    </div>
  )
}

export default SetBtn;