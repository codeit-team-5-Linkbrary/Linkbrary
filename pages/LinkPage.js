import React, { useState, useEffect } from "react";
import Image from "next/image";
import LinkCard from "@/components/LinkCard";
import Modal from "@/components/Modal";
import {
  fetchLinks,
  createLink,
  toggleFavorite,
  getLinksByFolderId,
  updateLink,
  deleteLink,
  getFavorites,
} from "@/lib/api_link";
import {
  getFolders,
  createFolder,
  renameFolder, // 수정된 부분
  deleteFolder,
} from "@/lib/api_folder";
import styles from "@/styles/LinkPage.module.css";
import AddIcon from "@/public/asset/link/Add.png";
import ShareIcon from "@/public/asset/link/Share.png";
import EditIcon from "@/public/asset/link/Pen.png";
import DeleteIcon from "@/public/asset/link/Delete.png";
import SearchIcon from "@/public/asset/link/Search.png";

const LinkPage = () => {
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("전체");
  const [folders, setFolders] = useState([{ id: "all", name: "전체" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const folderData = await getFolders(token);
        setFolders((prevFolders) => [...prevFolders, ...folderData]);
        const linkData = await fetchLinks(token);
        setLinks(linkData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    getInitialData();
  }, [token]);

  const handleAddFolder = async (folderName) => {
    try {
      const data = await createFolder(token, folderName);
      setFolders((prevFolders) => [...prevFolders, data]);
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  const handleAddLink = async (url, folderId) => {
    try {
      const data = await createLink(token, url, folderId);
      setLinks((prevLinks) => [...prevLinks, data]);
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

  const handleButtonClick = (folderId) => {
    setActiveButton(folderId);
    if (folderId !== "all") {
      getLinksByFolderId(token, folderId).then((data) => setLinks(data));
    } else {
      fetchLinks(token).then((data) => setLinks(data));
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const updatedLink = await toggleFavorite(
        token,
        id,
        links.find((link) => link.id === id).isFavorite
      );
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, isFavorite: updatedLink.favorite } : link
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setSelectedFolderId(null);
  };

  const handleOptionAction = (action, folderId = null) => {
    setIsModalOpen(true);
    setModalContent(action);
    setSelectedFolderId(folderId);
  };

  const handleFolderAction = async (action, folderId, newName = "") => {
    try {
      if (action === "add") {
        await handleAddFolder(newName);
      } else if (action === "edit") {
        await renameFolder(token, folderId, newName);
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === folderId ? { ...folder, name: newName } : folder
          )
        );
      } else if (action === "delete") {
        await deleteFolder(token, folderId);
        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder.id !== folderId)
        );
      }
      handleModalClose();
    } catch (error) {
      console.error(`Error performing ${action} on folder:`, error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // fetch data for the selected page
  };

  return (
    <div className={styles.linkPage}>
      <div className={styles.searchBar}>
        <div className={styles.searchContainer}>
          <button
            className={styles.searchButton}
            onClick={handleSearchButtonClick}
          >
            <Image
              src={SearchIcon}
              alt="Search Icon"
              className={styles.searchIcon}
            />
          </button>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="링크를 검색해 보세요."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.sortingContainer}>
          <div className={styles.sortingOptions}>
            {folders.map((folder) => (
              <button
                key={folder.id}
                className={`${styles.sortingButton} ${
                  activeButton === folder.id ? styles.sortingButtonActive : ""
                }`}
                onClick={() => handleButtonClick(folder.id)}
              >
                {folder.name}
              </button>
            ))}
          </div>
          <button
            className={styles.folderButton}
            onClick={() => handleOptionAction("add-folder")}
          >
            폴더 추가
            <Image src={AddIcon} alt="add Icon" className={styles.addIcon} />
          </button>
        </div>
        <div className={styles.optionBar}>
          <span className={styles.optionTitle}>
            {activeButton === "all"
              ? "전체"
              : folders.find((folder) => folder.id === activeButton)?.name}
          </span>
          {activeButton !== "all" && (
            <div className={styles.optionActions}>
              <div
                className={styles.optionAction}
                onClick={() =>
                  handleOptionAction(
                    "share",
                    folders.find((folder) => folder.id === activeButton)?.id
                  )
                }
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
                onClick={() =>
                  handleOptionAction(
                    "edit",
                    folders.find((folder) => folder.id === activeButton)?.id
                  )
                }
              >
                <Image
                  src={EditIcon}
                  alt="Edit"
                  className={styles.optionIcon}
                />{" "}
                이름 변경
              </div>
              <div
                className={styles.optionAction}
                onClick={() =>
                  handleOptionAction(
                    "delete",
                    folders.find((folder) => folder.id === activeButton)?.id
                  )
                }
              >
                <Image
                  src={DeleteIcon}
                  alt="Delete"
                  className={styles.optionIcon}
                />{" "}
                삭제
              </div>
            </div>
          )}
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
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              className={`${styles.paginationNumber} ${
                currentPage === idx + 1 ? styles.active : ""
              }`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          content={modalContent}
          onClose={handleModalClose}
          onAction={handleFolderAction}
          folderId={selectedFolderId}
        />
      )}
    </div>
  );
};

export default LinkPage;
