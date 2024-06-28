// 폴더 추가

import { useState } from "react";
import Button from "../Button";
import Modal from "./Modal";
import styles from "@/styles/Modal/ModalAddFolder.module.css";

const ModalAddFolder = ({ onClose, onAdd }) => {
  const [folderName, setFolderName] = useState("");

  const handleAddClick = () => {
    if (folderName) {
      onAdd(folderName);
      setFolderName("");
    }
  };

  return (
    <div>
      <Modal title="폴더 추가" onClose={onClose}>
        <input
          type="text"
          placeholder="내용 입력"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className={styles.input}
        />
        <Button type="Modal" onClick={handleAddClick}>
          추가하기
        </Button>
      </Modal>
    </div>
  );
};

export default ModalAddFolder;
