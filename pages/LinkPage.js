import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import LinkCard from "@/components/LinkCard";
import AddLink from "@/components/AddLink";
import ModalAddFolder from "@/components/Modal/ModalAddFolder";
import ModalDeleteFolder from "@/components/Modal/ModalDeleteFolder";
import ModalEdit from "@/components/Modal/ModalEdit";
import ModalShare from "@/components/Modal/ModalShare";
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
  renameFolder,
  deleteFolder,
} from "@/lib/api_folder";
import styles from "@/styles/LinkPage.module.css";
import AddIcon from "@/public/asset/link/Add.png";
import ShareIcon from "@/public/asset/link/Share.png";
import EditIcon from "@/public/asset/link/Pen.png";
import DeleteIcon from "@/public/asset/link/Delete.png";
import SearchIcon from "@/public/asset/link/Search.png";
import Nav from "@/components/Nav";
import UserContext from "@/contexts/UserContext";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";

const LinkPage = () => {
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("all");
  const [folders, setFolders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [inputLink, setInputLink] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext) || {};
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

  useEffect(() => {
    const getInitialData = async () => {
      setIsLoading(true);
      try {
        const folderData = await getFolders(token);
        setFolders(folderData?.reverse());
        // setFolders((prevFolders) => [...prevFolders, ...folderData]);
        const linkData = await fetchLinks(token);
        setLinks(linkData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
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

  const handleAddLink = async () => {
    try {
      const data = await createLink(token, inputLink, activeButton);
      console.log("data", data);
      setLinks((prevLinks) => [...prevLinks, data]);
    } catch (error) {
      alert(error.status);
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

  const handleButtonClick = async (folderId) => {
    setActiveButton(folderId);
    if (folderId !== "all") {
      try {
        const data = await getLinksByFolderId(token, folderId);
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links by folder:", error);
        alert("폴더에 속한 링크들을 불러오는 중 오류가 발생했습니다.");
      }
    } else {
      try {
        const folderData = await getFolders(token);
        setFolders(folderData.reverse());
        const linkData = await fetchLinks(token);
        setLinks(linkData);
      } catch (error) {
        console.error("Error fetching folders or links:", error);
        alert("전체 폴더 또는 링크를 불러오는 중 오류가 발생했습니다.");
      }
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const linkToUpdate = links.find((link) => link.id === id);
      const updatedLink = await updateLink(token, id, !linkToUpdate.isFavorite);
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, isFavorite: updatedLink.favorite } : link
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("즐겨찾기 상태 변경 중 오류가 발생했습니다.");
    }
  };

  const handleEditLink = async (id, newData) => {
    // 링크 편집 기능 구현
  };

  const handleDeleteLink = async (id) => {
    try {
      await deleteLink(token, id);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("링크 삭제 중 오류가 발생했습니다.");
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
        const linksToDelete = links.filter(
          (link) => link.folderId === folderId
        );
        const linkDeletePromises = linksToDelete.map((link) =>
          deleteLink(token, link.id).catch((error) => {
            console.error(`Error deleting link ${link.id}:`, error);
            throw error; // 링크 삭제 에러 처리
          })
        );
        await Promise.all(linkDeletePromises);

        await deleteFolder(token, folderId).catch((error) => {
          console.error(`Error deleting folder ${folderId}:`, error);
          throw error; // 폴더 삭제 에러 처리
        });

        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder.id !== folderId)
        );
      }
      handleModalClose();
    } catch (error) {
      console.error(`Error performing ${action} on folder:`, error);
      alert(
        `폴더 ${action === "delete" ? "삭제" : "수정"} 중 오류가 발생했습니다.`
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShareButtonClick = (folderId) => {
    setIsModalOpen(true);
    setModalContent("share");
    setSelectedFolderId(folderId);
  };

  return (
    <div>
      <Nav isLoggIn={true} user={user} />
      <AddLink
        inputLink={inputLink}
        setInputLink={setInputLink}
        handleAddLink={handleAddLink}
      />
      <div className={styles.linkPage}>
        {/* 임시 */}
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
              {/* 전체 */}
              <button
                className={`${styles.sortingButton} ${
                  activeButton === "all" ? styles.sortingButtonActive : ""
                }`}
                onClick={() => handleButtonClick("all")}
              >
                전체
              </button>

              {/* folders */}
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
          {activeButton !== "all" && (
            <div className={styles.optionBar}>
              <span className={styles.optionTitle}>
                {folders.find((folder) => folder.id === activeButton)?.name}
              </span>
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
            </div>
          )}
          <div className={styles.cardList}>
            {filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onToggleFavorite={() => handleToggleFavorite(link.id)}
              />
            ))}
          </div>
          <Pagination // Use the new Pagination component here
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {isModalOpen && modalContent === "add-folder" && (
          <ModalAddFolder
            onClose={handleModalClose}
            onAdd={(folderName) => handleFolderAction("add", null, folderName)}
          />
        )}
        {isModalOpen && modalContent === "edit" && (
          <ModalEdit
            onClose={handleModalClose}
            onSave={(newName) =>
              handleFolderAction("edit", selectedFolderId, newName)
            }
            itemName={
              folders.find((folder) => folder.id === selectedFolderId)?.name
            }
          />
        )}
        {isModalOpen && modalContent === "delete" && (
          <ModalDeleteFolder
            onClose={handleModalClose}
            onDelete={() => handleFolderAction("delete", selectedFolderId)}
            folderName={
              folders.find((folder) => folder.id === selectedFolderId)?.name
            }
          />
        )}
        {isModalOpen && modalContent === "share" && (
          <ModalShare
            onClose={handleModalClose}
            folderName={
              folders.find((folder) => folder.id === selectedFolderId)?.name
            }
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LinkPage;
