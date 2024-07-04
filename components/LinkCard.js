import React, { useState } from "react";
import styles from "@/styles/LinkCard.module.css";
import kebab from "@/public/asset/link/kebab.png";
import Star_default from "@/public/asset/link/Star_default.png";
import Star_selected from "@/public/asset/link/Star_selected.png";
import defaultImage from "@/public/asset/link/No_image.png"; // 기본 이미지
import ModalDeleteLink from "@/components/Modal/ModalDeleteLink";
import Image from "next/image"; // next/image 모듈 import

const LinkCard = ({ link, onEdit, onDelete, onToggleFavorite }) => {
  const { id, title, description, createdAt, isFavorite, imageSource } = link;
  const [isStar, setIsStar] = useState(isFavorite);
  const [isSettingMenu, setIsSettingMenu] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onStarClick = () => {
    setIsStar(!isStar);
    onToggleFavorite();
  };

  const toggleSettingMenu = () => {
    setIsSettingMenu((prevState) => !prevState);
  };

  const userUpDateAt = (date) => {
    const currentDate = new Date();
    const itemDate = new Date(date);

    if (isNaN(itemDate.getTime())) {
      return "유효하지 않은 날짜";
    }

    const timeDiff = currentDate.getTime() - itemDate.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0 && hours < 24) {
      return `${hours} 시간 전`;
    } else if (hours >= 24) {
      const day = Math.floor(hours / 24);
      return `${day} 일 전`;
    } else {
      return `${minutes} 분 전`;
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setIsDeleteModalOpen(false);
  };

  // description을 최대 50자로 제한하는 함수
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <li className={styles.card}>
      <div className={styles.cardImage}>
        {imageSource ? (
          <Image
            src={imageSource}
            alt={title}
            width={340}
            height={200}
            className={styles.cardImage}
          />
        ) : (
          <div className={styles.noImage}>
            <Image
              src={defaultImage.src}
              alt="Default"
              width={340}
              height={200}
              className={styles.noImage}
            />
          </div>
        )}
        <div className={styles.cardStarWrap} onClick={onStarClick}>
          <Image
            src={isStar ? Star_selected.src : Star_default.src}
            alt="Favorite"
            width={34}
            height={34}
          />
        </div>
      </div>
      <div className={styles.cardMenuList}>
        <div className={styles.cardMenuTop}>
          <p className={styles.cardUpdateAt}>{userUpDateAt(createdAt)}</p>
          <button
            className={styles.cardSettingButton}
            onClick={toggleSettingMenu}
          >
            <img src={kebab.src} alt="Menu" width={21} height={17} />
          </button>
          {isSettingMenu && (
            <ul className={styles.cardSettingList}>
              <li className={styles.cardSettingMenu} onClick={handleDelete}>
                삭제하기
              </li>
              <li className={styles.cardSettingMenu} onClick={onEdit}>
                수정하기
              </li>
            </ul>
          )}
        </div>
        <p className={styles.cardDescription}>
          {truncateDescription(description, 50)}
        </p>
        <p className={styles.cardCreatedAt}>
          <span className={styles.cardFullYear}>
            {new Date(createdAt).getFullYear()}.{" "}
          </span>
          <span className={styles.cardMonth}>
            {new Date(createdAt).getMonth() + 1}.{" "}
          </span>
          <span className={styles.cardDay}>
            {new Date(createdAt).getDate()}
          </span>
        </p>
      </div>
      {isDeleteModalOpen && (
        <ModalDeleteLink
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
          linkName={title}
        />
      )}
    </li>
  );
};

export default LinkCard;
