import Button from "./Button";
import styles from "@/styles/AddLink.module.css";
import Image from "next/image";

export default function AddLink({ inputLinkk, setInputLink, handleAddLink }) {
  return (
    <div className={styles.linkContainer}>
      <div className={styles.linkBox}>
        <div className={styles.imageContainer}>
          <Image
            src="/asset/LoadLink.svg"
            alt="링크 찾기"
            className={styles.image}
            width={20}
            height={20}
          />
        </div>
        <input
          type="text"
          placeholder="링크를 추가해 보세요"
          className={styles.input}
          value={inputLinkk}
          onChange={(e) => setInputLink(e.target.value)}
        />
        <Button type="Add" onClick={handleAddLink}>
          추가하기
        </Button>
      </div>
    </div>
  );
}
