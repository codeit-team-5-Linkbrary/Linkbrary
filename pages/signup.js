import Link from "next/link";
import LinkbraryLogo from "../public/asset/LinkbraryLogo.svg";
import Logo from "../styles/Login.module.css";

const Signup = () => {
  return (
    <>
      <div className={Logo.AuthContainer}>
        <div className={Logo.Login}>
          <Link href="/">
            <LinkbraryLogo />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
