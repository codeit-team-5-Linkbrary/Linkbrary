import styles from "@/styles/Button.module.css";

function Button({ children, type, onClick }) {
  const buttonClassName = `${styles.button} ${styles[type] || ""}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
