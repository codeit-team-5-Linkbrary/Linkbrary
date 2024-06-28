import Link from "next/link";
import LinkbraryLogo from "../public/asset/LinkbraryLogo.svg";
import Logo from "../styles/Logo.module.css";
import styles from "../styles/Login.module.css";
import Label from "@/components/Lable";
import Input from "@/components/Input";
import { useState } from "react";
import global from "../styles/LoginBox.module.css";
import SocialLogin from "@/components/Sociallogin";
import loginbutton from "../styles/Button.module.css";

const LoginPage = () => {
  const [values, setValues] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((preValues) => ({ ...preValues, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className={global.global}>
        <div>
          <div className={Logo.Login}>
            <Link href="/">
              <LinkbraryLogo />
            </Link>
          </div>
          <div className={Logo.Signup}>
            <p className={Logo.SignupLine}>
              회원이 아니신가요?
              <Link className={Logo.Signuplink} href="/signup">
                회원 가입하기
              </Link>
            </p>
          </div>
        </div>

        <form className={styles.Form} onChange={handleSubmit}>
          <Label className={styles.Label} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            className={styles.Input}
            name="email"
            type="email"
            placeholder="이메일"
            value={values.email}
            onChange={handleChange}
          ></Input>

          <Label className={styles.Label} htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.Input}
            name="password"
            type="password"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />

          <button type="submit" className={loginbutton.LoginPagebutton}>
            로그인
          </button>
          <div className={styles.sociallogin}>
            <SocialLogin />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
