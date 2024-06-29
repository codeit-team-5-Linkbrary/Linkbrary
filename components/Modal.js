import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Modal.module.css";
import ModalCloseIcon from "@/public/asset/Modal/Modal_close.png";
import ModalKakaoIcon from "@/public/asset/Modal/Modal_kakao.png";
import ModalFacebookIcon from "@/public/asset/Modal/Modal_facebook.png";
import ModalLinkIcon from "@/public/asset/Modal/Modal_link.png";

const Modal = ({ content, onClose, onAction, folderId }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (content === "edit") {
      onAction("edit", folderId, inputValue);
    } else if (content === "delete") {
      onAction("delete", folderId);
    } else if (content === "add-folder") {
      onAction("add", null, inputValue);
    }
    onClose();
  };

  return (
    <div className={styles.dim}>
      <div className={styles.modal}>
        <div className={styles.close} onClick={onClose}>
          <Image src={ModalCloseIcon} alt="Close" />
        </div>
        {content === "edit" && (
          <div className={styles.content}>
            <h2>폴더 이름 변경</h2>
            <input
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="새 이름을 입력하세요"
            />
            <button className={styles.cta} onClick={handleSubmit}>
              변경하기
            </button>
          </div>
        )}
        {content === "delete" && (
          <div className={styles.content}>
            <h2>폴더 삭제</h2>
            <p>정말 삭제하시겠습니까?</p>
            <button className={styles.cta_delete} onClick={handleSubmit}>
              삭제하기
            </button>
          </div>
        )}
        {content === "add-folder" && (
          <div className={styles.content}>
            <h2>폴더 추가</h2>
            <input
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="폴더 이름을 입력하세요"
            />
            <button className={styles.cta} onClick={handleSubmit}>
              추가하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
