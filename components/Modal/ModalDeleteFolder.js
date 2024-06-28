//폴더 삭제

import Button from "../Button";
import Modal from "./Modal";
import styles from "@/styles/Modal/ModalDeleteFolder.module.css";

const ModalDeleteFolder = ({ onClose, onDelete, folderName }) => {
  return (
    <Modal title="폴더 삭제" onClose={onClose}>
      <div className={styles.folderName}>{folderName}</div>
      <Button type="ModalDelete" onClick={onDelete}>
        삭제하기
      </Button>
    </Modal>
  );
};

export default ModalDeleteFolder;
