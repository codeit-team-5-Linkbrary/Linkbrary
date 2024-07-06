import React, { useEffect, useState } from "react";
import styles from "@/styles/LinkCard.module.css";
import kebab from "@/public/asset/link/kebab.png";
import Star_default from "@/public/asset/link/Star_default.png";
import Star_selected from "@/public/asset/link/Star_selected.png";
import defaultImage from "@/public/asset/link/No_image.png"; // 기본 이미지
import ModalDeleteLink from "@/components/Modal/ModalDeleteLink";
import Image from "next/image";

const LinkCard = ({ link, onEdit, onDelete, onToggleFavorite }) => {
  const { id, title, description, createdAt, favorite, imageSource, url } =
    link;
  const [isSettingMenu, setIsSettingMenu] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [starImage, setStarImage] = useState(
    favorite ? Star_selected : Star_default
  );

  useEffect(() => {
    setStarImage(favorite ? Star_selected : Star_default);
  }, [favorite]);

  const onStarClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(id);
  };

  const toggleSettingMenu = (e) => {
    e.stopPropagation();
    setIsSettingMenu((prevState) => !prevState);
  };

  const userUpDateAt = (date) => {
    const currentDate = new Date();
    const itemDate = new Date(date);

    if (isNaN(itemDate.getTime())) {
      return "";
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

  const handleConfirmDelete = async () => {
    try {
      await onDelete(id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  // description을 최대 50자로 제한하는 함수
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const handleCardClick = () => {
    window.open(url, "_blank");
  };

  return (
    <>
      <li className={styles.card} onClick={handleCardClick}>
        <div className={styles.cardImage}>
          {imageSource ? (
            <Image
              src={imageSource}
              alt={title}
              width={340}
              height={200}
              className={styles.cardImage}
              sizes="(max-width: 768px) 100vw, 50vw"
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
            <Image src={starImage} alt="Favorite" width={34} height={34} />
          </div>
        </div>
        <div className={styles.cardMenuList}>
          <div className={styles.cardMenuTop}>
            <p className={styles.cardUpdateAt}>{userUpDateAt(createdAt)}</p>
            <button
              className={styles.cardSettingButton}
              onClick={toggleSettingMenu}
            >
              <Image src={kebab.src} alt="Menu" width={21} height={17} />
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
          <p className={styles.cardTitle}>{truncateDescription(title, 20)}</p>
          <p className={styles.cardDescription}>
            {truncateDescription(description, 20)}
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
      </li>
      {isDeleteModalOpen && (
        <ModalDeleteLink
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
          linkName={title}
        />
      )}
    </>
  );
};

export default LinkCard;
