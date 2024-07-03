import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import styels from "@/styles/favorite.module.css";

export default function favorite() {
  return (
    <div>
      <Nav />
      <div className={styels.favoritePage}>
        <div className={styels.favorite}>⭐️ 즐겨찾기</div>
      </div>
      <Footer />
    </div>
  );
}
