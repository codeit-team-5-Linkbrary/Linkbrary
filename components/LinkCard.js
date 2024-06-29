import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/LinkCard.module.css";
import kebab from "@/public/asset/link/kebab.png";
import Star_default from "@/public/asset/link/Star_default.png";
import Star_selected from "@/public/asset/link/Star_selected.png";
import defaultImage from "@/public/asset/link/No_image.png";

const LinkCard = ({ link, onEdit, onDelete, onToggleFavorite }) => {
  const { title, description, imageSource, createdAt, isFavorite } = link;
  const [isStar, setIsStar] = useState(isFavorite);
  const [isSettingMenu, setIsSettingMenu] = useState(false);

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
    const timeDiff = currentDate.getTime() - itemDate.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0 && hours < 24) {
      return `${hours} hours ago`;
    } else if (hours >= 24) {
      const day = Math.floor(hours / 24);
      return `${day} days ago`;
    } else {
      return `${minutes} minutes ago`;
    }
  };

  return (
    <li className={styles.card}>
      <div className={styles.cardImageWrap}>
        {imageSource ? (
          <Image
            className={styles.cardImage}
            src={imageSource}
            alt={title}
            layout="fill"
          />
        ) : (
          <div className={styles.noImage}>
            <Image src={defaultImage} alt="Default" layout="fill" />
          </div>
        )}
        <div className={styles.cardStarWrap} onClick={onStarClick}>
          <Image
            src={isStar ? Star_selected : Star_default}
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
            <Image src={kebab} alt="Menu" width={21} height={17} />
            {isSettingMenu && (
              <ul className={styles.cardSettingList}>
                <li className={styles.cardSettingMenu} onClick={onDelete}>
                  삭제하기
                </li>
                <li className={styles.cardSettingMenu} onClick={onEdit}>
                  수정하기
                </li>
              </ul>
            )}
          </button>
        </div>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
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
  );
};

export default LinkCard;
