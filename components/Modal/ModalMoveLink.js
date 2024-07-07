import React, { useState } from "react";
import styles from "@/styles/Modal/ModalMoveLink.module.css";
import Button from "@/components/Button";

const ModalMoveLink = ({ onClose, onMove, folders }) => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleMove = () => {
    onMove(selectedFolderId);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>폴더에 추가</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={styles.folderItem}
              onClick={() => setSelectedFolderId(folder.id)}
            >
              {folder.name} {folder.id === selectedFolderId && <span>&#10003;</span>}
            </div>
          ))}
        </div>
        <div className={styles.modalFooter}>
          <Button onClick={handleMove} variant="primary">추가하기</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalMoveLink;
