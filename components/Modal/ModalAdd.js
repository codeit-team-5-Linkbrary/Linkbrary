// 폴더에 링크 추가

import { useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import styles from "@/styles/Modal/ModalAdd.module.css";

const ModalAdd = ({ onClose, onAdd, folders = [] }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [linkName, setLinkName] = useState("");

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleAddClick = () => {
    if (selectedFolder) {
      onAdd(selectedFolder.name);
    }
  };

  return (
    <Modal title="폴더에 추가" onClose={onClose}>
      <div className={styles.linkName}>{linkName}</div>
      <div className={styles.folderList}>
        {folders.map((folder, index) => (
          <div
            key={index}
            className={`${styles.folderItem} ${
              selectedFolder === folder ? styles.selected : ""
            }`}
            onClick={() => handleFolderClick(folder)}
          >
            <div className={styles.folderName}>{folder.name}</div>
            <div className={styles.linkCount}>
              {folder.links.length}개의 링크
            </div>
          </div>
        ))}
      </div>
      <Button type="Modal" onClick={handleAddClick}>
        추가하기
      </Button>
    </Modal>
  );
};

export default ModalAdd;
