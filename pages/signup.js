import Link from "next/link";
import LinkbraryLogo from "../public/asset/LinkbraryLogo.svg";
import Logo from "../styles/Logo.module.css";
import Label from "@/components/Label";
import Input from "@/components/Input";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import global from "../styles/LoginBox.module.css";
import instance from "@/lib/axios";
import Button from "@/components/Button";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password } = values;
    await instance.post("/auth/sign-up", { email, password, name });
    redirectToHomePage();
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

        <form className={styles.Form} onSubmit={handleSubmit}>
          <Label className={styles.Label} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            className={styles.Input}
            name="email"
            type="email"
            placeholder="example@email.com"
            value={values.email}
            onChange={handleChange}
            required
          />

          <Label className={styles.Label} htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.Input}
            name="password"
            type="password"
            placeholder="특수문자 포함, 16자 이상"
            value={values.password}
            onChange={handleChange}
          />

          <Label className={styles.Label} htmlFor="password">
            이름
          </Label>
          <Input
            id="name"
            className={styles.Input}
            name="name"
            type="text"
            placeholder="이름"
            value={values.name}
            onChange={handleChange}
          />
          <Button variant="Signup" type="submit">
            회원가입
          </Button>
          <Indicator />
        </form>
      </div>
    </>
  );
};

export default Signup;

function redirectToHomePage() {
  const homePageUrl = "/LoginPage";
  window.location.href = homePageUrl;
}

function Indicator({ isLoaging }) {
  return <div>{isLoaging ? <p>Loding...</p> : <p></p>}</div>;
}
