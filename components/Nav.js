import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "@/styles/Nav.module.css";
import Button from "./Button";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";

function Nav() {
  const router = useRouter();
  const { user, fetchUser, logout, isLoading } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLinkClick = () => {
    router.push("/LoginPage");
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = () => {
    logout();
    router.push("/"); // Redirect to homepage or login page after logout
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
            <div
              className={styles.userInfo}
              onClick={handleProfileClick}
              ref={dropdownRef}
            >
              <Image
                src="/asset/profileImg.svg"
                alt="프로필 이미지"
                width={28}
                height={28}
              />
              <span>{user.name}</span>
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <button onClick={handleLogoutClick}>로그아웃</button>
                </div>
              )}
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
