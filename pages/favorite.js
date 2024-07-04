import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Pagination from "@/components/Pagination";
import styels from "@/styles/favorite.module.css";
import { useState } from "react";

export default function favorite() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Nav />
      <div className={styels.favoritePage}>
        <div className={styels.favorite}>⭐️ 즐겨찾기</div>
      </div>
      <Pagination // Use the new Pagination component here
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}
