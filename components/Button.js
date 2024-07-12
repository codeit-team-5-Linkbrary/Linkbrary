import styles from "../styles/Button.module.css";

function Button({ children, type, onClick, variant }) {
  const buttonClassName = `${styles.button} ${styles[variant] || ""}`;

  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
