// 폴더 이름 변경

import { useState } from "react";
import Button from "../Button";
import Modal from "./Modal";
import styles from "@/styles/Modal/ModalEdit.module.css";

const ModalEdit = ({ onClose, onSave, itemName }) => {
  const [newFolderName, setNewFolderName] = useState(itemName);

  const handleInputChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleSaveClick = () => {
    onSave(newFolderName);
  };

  return (
    <div>
      <Modal title="폴더 이름 변경" onClose={onClose}>
        <input
          type="text"
          placeholder="새 폴더 이름"
          value={newFolderName}
          onChange={handleInputChange}
          className={styles.input}
        />
        <Button type="Modal" onClick={handleSaveClick}>
          변경하기
        </Button>
      </Modal>
    </div>
  );
};

export default ModalEdit;
