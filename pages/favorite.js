import React, { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LinkCard from "@/components/LinkCard";
import { getFavorites, updateLink, deleteLink } from "@/lib/api_link"; // 변경: updateLink, deleteLink 추가
import styles from "@/styles/favorite.module.css";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const data = await getFavorites(token);
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchFavorites();
    }
  }, [token]);

  const handleToggleFavorite = async (linkId) => {
    // 변경: id -> linkId
    try {
      const linkToUpdate = favorites.find((link) => link.id === linkId);
      const updatedLink = await updateLink(
        token,
        linkId,
        !linkToUpdate.favorite
      ); // 변경: id -> linkId
      setFavorites((prevFavorites) =>
        prevFavorites.map(
          (link) =>
            link.id === linkId
              ? { ...link, favorite: updatedLink.favorite }
              : link // 변경: id -> linkId
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleDeleteLink = async (linkId) => {
    // 변경: id -> linkId
    try {
      await deleteLink(token, linkId); // 변경: id -> linkId
      setFavorites(
        (prevFavorites) => prevFavorites.filter((link) => link.id !== linkId) // 변경: id -> linkId
      );
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };
  return (
    <div>
      <Nav />
      <div className={styles.favoritePage}>
        <div className={styles.favorite}>⭐️ 즐겨찾기</div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.cardList}>
            {favorites.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onToggleFavorite={() => handleToggleFavorite(link.id)} // 변경: onToggleFavorite 핸들러 추가
                onDelete={() => handleDeleteLink(link.id)} // 변경: onDelete 핸들러 추가
              />
            ))}
          </div>
        )}
      </div>
      <Pagination // Use the new Pagination component here
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
};

export default FavoritePage;
