import styles from "../styles/Sociallogin.module.css";
import googleLogo from "../public/asset/google-logo.png";
import kakaoLogo from "../public/asset/kakao-logo.png";
import Image from "next/image";

const SocialLoginLink = ({ name, url, logoSrc }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
      <Image src={logoSrc} alt={name} width="42" />
    </a>
  );
};

const SocialLogin = () => {
  return (
    <div className={styles.Container}>
      <p className={styles.title}>소셜 로그인</p>

      <div className={styles.SocialLoginLinksContainer}>
        <SocialLoginLink
          name="구글 로그인"
          url="https://www.google.com/"
          logoSrc={googleLogo}
        />
        <SocialLoginLink
          name="카카오톡 로그인"
          url="https://www.kakaocorp.com/page/"
          logoSrc={kakaoLogo}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
