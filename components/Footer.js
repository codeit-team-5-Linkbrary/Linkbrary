import styles from "@/styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContents}>
        <p class={styles.footerColor}>©codeit-2023</p>
        <div className={styles.footerContent}>
          <Link href="/privacy" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link href="/faq" className={styles.footerLink}>
            FAQ
          </Link>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/asset/Facebook.png"
          width={20}
          height={20}
          alt="facebookLogo"
        ></Image>
        <Image
          src="/asset/Instagram.png"
          width={20}
          height={20}
          alt="InstagramLogo"
        ></Image>
        <Image
          src="/asset/Twitter.png"
          width={20}
          height={20}
          alt="TwitterLogo"
        ></Image>
        <Image
          src="/asset/Youtube.png"
          width={20}
          height={20}
          alt="YoutubeLogo"
        ></Image>
      </div>
    </div>
  );
}

export default Footer;
