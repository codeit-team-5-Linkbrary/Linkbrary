import styles from "@/styles/Modal/Modal.module.css";
import Image from "next/image";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div onClick={onClose} className={styles.closeButton}>
          <Image
            src="/asset/closeButton.svg"
            alt="Close"
            width={24}
            height={24}
          />
        </div>
        <div className={styles.modalHeader}>{title}</div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
