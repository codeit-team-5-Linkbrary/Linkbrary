import { useState } from "react";
import Button from "./Button";
import styles from "@/styles/AddLink.module.css";
import Image from "next/image";
import axios from "@/lib/axios";

export default function AddLink() {
  const [link, setLink] = useState("");

  const handleAddLink = async () => {
    if (link.trim() !== "") {
      try {
        const response = await axios.post("/links", { url: link });
        console.log(`추가된 링크: ${response.data}`);
        setLink("");
      } catch (error) {
        console.error("링크 추가 중 오류 발생:", error);
      }
    } else {
      console.log("링크를 입력해주세요.");
    }
  };

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
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button variant="Add" onClick={handleAddLink}>
          추가하기
        </Button>
      </div>
    </div>
  );
}
