import { useRouter } from "next/router";
import styles from "@/styles/NotFound.module.css";
import Button from "@/components/Button";

function NotFound() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <h1>404</h1>
        <h2>Not Found</h2>
        <p>페이지를 찾을 수 없습니다.</p>
      </div>
      <Button type="" onClick={handleHomeClick}>
        {`<`}- 홈으로 이동하기
      </Button>
      <div className={styles.shadow}></div>
    </div>
  );
}

export default NotFound;
