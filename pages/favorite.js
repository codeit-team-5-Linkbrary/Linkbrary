import { useState } from "react";
import FavoriteLinks from "@/components/FavoriteLinks";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import favorite from "@/public/asset/favorite.png";
import styles from "@/styles/Favorite.module.css";

export default function FavoritePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTotalPagesChange = (totalPages) => {
    setTotalPages(totalPages);
  };

  return (
    <div>
      <Nav />
      <div className={styles.favoritePage}>
        <div className={styles.favorite}>
          <Image src={favorite} alt="즐겨찾기" className={styles.favoriteImg} />
        </div>
      </div>
      <div className={styles.FavoriteLinks}>
        <FavoriteLinks onTotalPagesChange={handleTotalPagesChange} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </div>
  );
}
