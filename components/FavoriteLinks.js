import React, { useState, useEffect } from "react";
import LinkCard from "@/components/LinkCard";
import { getFavorites, updateLink } from "@/lib/api_link";
import styles from "@/styles/FavoriteLinks.module.css";

const FavoriteLinks = ({ currentPage, onTotalPagesChange }) => {
  const [favoriteLinks, setFavoriteLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 9; // 페이지 당 링크 개수

  const fetchFavoriteLinks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const { links, totalPages } = await getFavorites(
        token,
        currentPage,
        pageSize
      );
      setFavoriteLinks(links);
      onTotalPagesChange(totalPages);
    } catch (error) {
      console.error("Error fetching favorite links:", error);
      setError("즐겨찾기 링크를 불러오는 데 실패했습니다.");
      setFavoriteLinks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteLinks();
  }, [currentPage]);

  const handleToggleFavorite = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const currentLink = favoriteLinks.find((link) => link.id === id);
      await updateLink(token, id, !currentLink.favorite);
      await fetchFavoriteLinks();
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      setError("즐겨찾기 상태 변경에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <div className={styles.notLink}>로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.notLink}>{error}</div>;
  }

  if (!Array.isArray(favoriteLinks) || favoriteLinks.length === 0) {
    return <div className={styles.notLink}>즐겨찾기 링크가 없습니다</div>;
  }

  return (
    <div className={styles.links}>
      {favoriteLinks.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onToggleFavorite={() => handleToggleFavorite(link.id)}
        />
      ))}
    </div>
  );
};

export default FavoriteLinks;
