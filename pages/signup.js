import Link from "next/link";
import LinkbraryLogo from "../public/asset/LinkbraryLogo.svg";
import Logo from "../styles/Logo.module.css";
import Label from "@/components/Lable";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import global from "../styles/LoginBox.module.css";
import loginButton from "../styles/Button.module.css";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

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
              이미 회원이신가요?
              <Link className={Logo.Signuplink} href="/LoginPage">
                로그인하기
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
          <Label className={styles.Label} htmlFor="password">
            비밀번호확인
          </Label>
          <Input
            id="password"
            className={styles.Input}
            name="password"
            type="password"
            placeholder="비밀번호확인"
            value={values.password}
            onChange={handleChange}
          />
        </form>
        <Button type="submit">회원가입</Button>
      </div>
    </>
  );
};

export default Signup;
