// 링크 삭제

import Button from "../Button";
import Modal from "./Modal";
import styles from "@/styles/Modal/ModalDeleteLink.module.css";

const ModalDeleteLink = ({ onClose, onDelete, linkName }) => {
  return (
    <Modal title="링크 삭제" onClose={onClose}>
      <div className={styles.linkName}>{linkName}</div>
      <Button type="ModalDelete" onClick={onDelete}>
        삭제하기
      </Button>
    </Modal>
  );
};

export default ModalDeleteLink;
