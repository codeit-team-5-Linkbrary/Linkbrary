import Link from "next/link";
import LinkbraryLogo from "../public/asset/LinkbraryLogo.svg";
import Logo from "../styles/Login.module.css";
import styles from "../styles/Login.module.css";
import Label from "@/components/Lable";
import Input from "@/components/Input";
import { useState } from "react";
import Button from "@/components/Button";

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
      <div className={Logo.AuthContainer}>
        <div className={Logo.Login}>
          <Link href="/">
            <LinkbraryLogo />
          </Link>
        </div>
        <div className={Logo.Signup}>
          회원이 아니신가요?<Link href="/signup">회원 가입하기</Link>
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
        <Button className={styles.Button}>로그인</Button>
      </form>
    </>
  );
};

export default LoginPage;
