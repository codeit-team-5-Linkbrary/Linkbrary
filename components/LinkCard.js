import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import LinkCard from "@/components/LinkCard";
import styles from "@/styles/LinkPage.module.css";
import AddIcon from "@/public/asset/link/Add.png";
import ShareIcon from "@/public/asset/link/Share.png";
import EditIcon from "@/public/asset/link/Pen.png";
import DeleteIcon from "@/public/asset/link/Delete.png";
import SearchIcon from "@/public/asset/link/Search.png";
import Modal from "@/components/Modal";

const LinkPage = () => {
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("전체");
  const [folders, setFolders] = useState([
    "전체",
    "유튜브",
    "코딩 팁",
    "채용 사이트",
    "유용한 글",
    "나만의 장소",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

  const fetchLinks = async () => {
    try {
      const response = await axios.get(
        "https://linkbrary-api.vercel.app/6-5/links",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAddLink = async (newLink) => {
    try {
      const response = await axios.post(
        "https://linkbrary-api.vercel.app/6-5/links",
        newLink,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLinks([...links, response.data]);
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    console.log("검색 실행:", searchQuery);
  };

  const filteredLinks = links.filter(
    (link) =>
      link.url.includes(searchQuery) ||
      link.title.includes(searchQuery) ||
      link.description.includes(searchQuery)
  );

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleToggleFavorite = async (id) => {
    try {
      const response = await axios.put(
        `https://linkbrary-api.vercel.app/6-5/links/${id}`,
        { favorite: !links.find((link) => link.id === id).isFavorite },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLinks(
        links.map((link) =>
          link.id === id ? { ...link, isFavorite: !link.isFavorite } : link
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleAddFolder = () => {
    setIsModalOpen(true);
    setModalContent("add-folder");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleOptionAction = (action) => {
    setIsModalOpen(true);
    setModalContent(action);
  };

  return (
    <div className={styles.linkPage}>
      <div className={styles.searchBar}>
        <div className={styles.searchContainer}>
          <Image
            src={SearchIcon}
            alt="Search Icon"
            className={styles.searchIcon}
          />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="링크를 검색해 보세요."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Image
          src={AddIcon}
          alt="Add Icon"
          className={styles.addIcon}
          onClick={handleAddLink}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.sortingContainer}>
          <div className={styles.sortingOptions}>
            {folders.map((buttonName) => (
              <button
                key={buttonName}
                className={`${styles.sortingButton} ${
                  activeButton === buttonName ? styles.sortingButtonActive : ""
                }`}
                onClick={() => handleButtonClick(buttonName)}
              >
                {buttonName}
              </button>
            ))}
          </div>
          <button className={styles.folderButton} onClick={handleAddFolder}>
            폴더 추가
            <Image src={AddIcon} alt="add Icon" className={styles.addIcon} />
          </button>
        </div>
        <div className={styles.optionBar}>
          <span className={styles.optionTitle}>유용한 글</span>
          <div className={styles.optionActions}>
            <div
              className={styles.optionAction}
              onClick={() => handleOptionAction("share")}
            >
              <Image
                src={ShareIcon}
                alt="Share"
                className={styles.optionIcon}
              />{" "}
              공유
            </div>
            <div
              className={styles.optionAction}
              onClick={() => handleOptionAction("edit")}
            >
              <Image src={EditIcon} alt="Edit" className={styles.optionIcon} />{" "}
              이름 변경
            </div>
            <div
              className={styles.optionAction}
              onClick={() => handleOptionAction("delete")}
            >
              <Image
                src={DeleteIcon}
                alt="Delete"
                className={styles.optionIcon}
              />{" "}
              삭제
            </div>
          </div>
        </div>
        <div className={styles.cardList}>
          {filteredLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onToggleFavorite={() => handleToggleFavorite(link.id)}
            />
          ))}
        </div>
        <div className={styles.pagination}>
          <button className={styles.paginationButton}>&lt;</button>
          {Array.from({ length: 5 }, (_, idx) => (
            <button key={idx} className={styles.paginationNumber}>
              {idx + 1}
            </button>
          ))}
          <span className={styles.paginationDots}>...</span>
          <button className={styles.paginationNumber}>9</button>
          <button className={styles.paginationButton}>&gt;</button>
        </div>
      </div>
      {isModalOpen && (
        <Modal content={modalContent} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default LinkPage;
