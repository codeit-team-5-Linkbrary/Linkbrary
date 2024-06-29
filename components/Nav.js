import Link from "next/link";
import styles from "@/styles/Nav.module.css";
import { useRouter } from "next/router";
import Button from "./Button";
import Image from "next/image";

function Nav() {
  /* ui 작성을 위해 임의로 작성한 코드
   true, false 바꾸면 nav ui 달라짐*/
  const isLoggIn = false;
  const user = {
    name: "홍길동",
  };

  const router = useRouter();

  const handleLinkClick = () => {
    router.push("/LoginPage");
  };

  return (
    <div className={styles.nav}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <Image
            src="/asset/LinkbraryLogo.svg"
            alt="로고이미지"
            width={128}
            height={24}
          />
        </Link>
      </div>
      <div className={styles.userSection}>
        {isLoggIn ? (
          <div className={styles.userWrapper}>
            <Link href="/favorite">
              <Button type="Bookmark">
                <span>⭐</span>즐겨찾기
              </Button>
            </Link>
            <div className={styles.userInfo}>
              <Image
                src="/asset/profileImg.svg"
                alt="유저이미지"
                width={28}
                height={28}
              />
              <span>{user?.name}</span>
            </div>
          </div>
        ) : (
          <Button type="LandingLogin" onClick={handleLinkClick}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
}

export default Nav;
