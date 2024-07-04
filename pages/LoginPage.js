import Link from "next/link";
import LinkbraryLogo from "../public/asset/LinkbraryLogo.svg";
import Logo from "../styles/Logo.module.css";
import styles from "../styles/Login.module.css";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useState } from "react";
import global from "../styles/LoginBox.module.css";
import SocialLogin from "@/components/Sociallogin";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import Button from "@/components/Button";

const LoginPage = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();
  const { fetchUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/sign-in", {
        email: values.email,
        password: values.password,
      });

      const { accessToken } = response.data;

      if (!accessToken) {
        throw new Error("Token not received from server");
      }
      localStorage.setItem("accessToken", accessToken);
      await fetchUser(); // 사용자 정보를 업데이트합니다
      // fetchUser가 완료된 후 라우팅을 수행합니다
      router.push("/LinkPage");
    } catch (error) {
      if (error.response) {
      }
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

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

        <form className={styles.Form} onSubmit={handleSubmit}>
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
          />
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
          <Button
            variant="Login"
            type="submit"
            onClick={() => {
              Login();
            }}
          >
            로그인
          </Button>
          <div className={styles.sociallogin}>
            <SocialLogin />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
