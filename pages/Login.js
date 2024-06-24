import Link from "next/link";
import LinkbraryLogo from "../public/asset/Linkbrary.svg";
import Logo from "../styles/Login.module.css";

const Login = () => {
  return (
    <>
      <civ className={Logo.global}>
        <div className={Logo.Login}>
          <Link href="/">
            <LinkbraryLogo />
          </Link>
        </div>
      </civ>
    </>
  );
};

export default Login;
