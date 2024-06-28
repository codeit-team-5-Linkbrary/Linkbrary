import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Modal.module.css";
import ModalCloseIcon from "@/public/asset/Modal/Modal_close.png";
import ModalKakaoIcon from "@/public/asset/Modal/Modal_kakao.png";
import ModalFacebookIcon from "@/public/asset/Modal/Modal_facebook.png";
import ModalLinkIcon from "@/public/asset/Modal/Modal_link.png";

const Modal = ({ content, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // 여기서 API 호출 등 작업을 처리합니다.
    onClose();
  };

  const handleKakaoShare = () => {
    // 카카오톡 공유 기능 구현
  };

  const handleFacebookShare = () => {
    // 페이스북 공유 기능 구현
  };

  const handleLinkCopy = () => {
    // 링크 복사 기능 구현
  };

  return (
    <div className={styles.dim}>
      <div className={styles.modal}>
        <div className={styles.close} onClick={onClose}>
          <Image src={ModalCloseIcon} alt="Close" />
        </div>
        {content === "add-folder" && (
          <div className={styles.content}>
            <h2>폴더 추가</h2>
            <input
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="내용 입력"
            />
            <button className={styles.cta} onClick={handleSubmit}>
              추가하기
            </button>
          </div>
        )}
        {content === "share" && (
          <div className={styles.content}>
            <h2>폴더 공유</h2>
            <p className={styles.folderName}>폴더명</p>
            <div className={styles.shareIcons}>
              <div onClick={handleKakaoShare} className={styles.shareIcon}>
                <Image src={ModalKakaoIcon} alt="카카오톡" />
                <span>카카오톡</span>
              </div>
              <div onClick={handleFacebookShare} className={styles.shareIcon}>
                <Image src={ModalFacebookIcon} alt="페이스북" />
                <span>페이스북</span>
              </div>
              <div onClick={handleLinkCopy} className={styles.shareIcon}>
                <Image src={ModalLinkIcon} alt="링크 복사" />
                <span>링크 복사</span>
              </div>
            </div>
          </div>
        )}
        {content === "edit" && (
          <div className={styles.content}>
            <h2>폴더 이름 변경</h2>
            <input
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="새 이름을 입력하세요"
            />
            <button className={styles.cta} onClick={handleSubmit}>
              변경하기
            </button>
          </div>
        )}
        {content === "delete" && (
          <div className={styles.content}>
            <h2>링크 삭제</h2>
            <p>정말 삭제하시겠습니까?</p>
            <button className={styles.cta_delete} onClick={handleSubmit}>
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
