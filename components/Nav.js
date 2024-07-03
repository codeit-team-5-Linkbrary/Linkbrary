import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Nav.module.css";
import Button from "./Button";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";

function Nav() {
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      await fetchUser();
      setIsLoading(false);
    };
    checkUser();
  }, [fetchUser]);

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
        {isLoading ? (
          <div>Loading...</div>
        ) : user ? (
          <div className={styles.userWrapper}>
            <Link href="/favorite">
              <Button variant="Bookmark">
                <span>⭐</span>즐겨찾기
              </Button>
            </Link>
            <div className={styles.userInfo}>
              <Image
                src="/asset/profileImg.svg"
                alt="프로필 이미지"
                width={28}
                height={28}
              />
              <span>{user.name}</span>
            </div>
          </div>
        ) : (
          <Button variant="LandingLogin" onClick={handleLinkClick}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
}

export default Nav;
