import styles from "./SetBtn.module.css";

const SetBtn = ({ text, style, bgcolor, onClick }) => {
  return (
    <div className={[styles.SetBtn, styles[style]].join(" ")} onClick={onClick} style={{backgroundColor: bgcolor}}>
      <div>{text}</div>
    </div>
  )
}

export default SetBtn;