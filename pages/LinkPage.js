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
import AddIconSmall from "@/public/asset/link/Add2.png";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const { user } = useContext(UserContext) || {};
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

  useEffect(() => {
    const getInitialData = async () => {
      setIsLoading(true);
      try {
        const folderData = await getFolders(token);
        setFolders(folderData?.reverse());
        const linkData = await fetchLinks(token);
        setLinks(linkData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      getInitialData();
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 390);
    };

    handleResize(); // 초기 로드 시 실행
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddFolder = async (folderName) => {
    if (isActionLoading) return;
    setIsActionLoading(true);
    try {
      const data = await createFolder(token, folderName);
      setFolders((prevFolders) => [...prevFolders, data]);
    } catch (error) {
      alert("폴더 추가 중 오류가 발생했습니다.");
      console.error("Error adding folder:", error);
    } finally {
      setIsActionLoading(false);
    }
  };
  const handleDeleteLink = async (linkId) => {
    if (isActionLoading) return;
    setIsActionLoading(true);
    try {
      await deleteLink(token, linkId);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
    } catch (error) {
      alert("링크 삭제 중 오류가 발생했습니다.");
      console.error("Error deleting link:", error);
    } finally {
      setIsActionLoading(false);
    }
  };
  const handleAddLink = async () => {
    if (isActionLoading) return;
    setIsActionLoading(true);
    try {
      const data = await createLink(token, inputLink, activeButton);
      console.log("data", data);
      setLinks((prevLinks) => [...prevLinks, data]);
      setInputLink("");
    } catch (error) {
      alert("링크 추가 중 오류가 발생했습니다.");
      console.error("Error adding link:", error);
    } finally {
      setIsActionLoading(false);
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
    setIsLoading(true);
    try {
      let data;
      if (folderId !== "all") {
        data = await getLinksByFolderId(token, folderId);
      } else {
        data = await fetchLinks(token);
      }
      console.log("Fetched links data:", data); // 응답 데이터 확인
      setLinks(data);
    } catch (error) {
      console.error("Error fetching links by folder:", error);
      alert("폴더에 속한 링크들을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const linkToUpdate = links.find((link) => link.id === id);
      const newFavoriteStatus = !linkToUpdate.favorite;

      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, favorite: newFavoriteStatus } : link
        )
      );

      const updatedLink = await updateLink(token, id, newFavoriteStatus);

      // API 응답으로 최종 상태 업데이트 (서버 상태와 동기화)
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, favorite: updatedLink.favorite } : link
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("즐겨찾기 상태 변경 중 오류가 발생했습니다.");

      // 에러 발생 시 원래 상태로 되돌리기
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, favorite: linkToUpdate.favorite } : link
        )
      );
    }
  };

  const handleEditLink = async (id, newData) => {
    // 링크 편집 기능 구현
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
    } finally {
      setIsActionLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 페이지네이션을 위한 링크 슬라이스
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstLink, indexOfLastLink);

  // 검색결과 문구 설정
  const searchResultText = searchQuery
    ? `${searchQuery}으로 검색한 결과입니다.`
    : "";

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
              <span className={styles.folderButtonText}>폴더 추가</span>
              <Image
                src={isSmallScreen ? AddIconSmall : AddIcon}
                alt="add Icon"
                className={styles.addIcon}
              />
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
          {searchResultText && (
            <div className={styles.searchResultText}>{searchResultText}</div>
          )}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className={styles.cardList}>
              {currentLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onToggleFavorite={() => handleToggleFavorite(link.id)}
                  onDelete={() => handleDeleteLink(link.id)}
                />
              ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredLinks.length / linksPerPage)}
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
