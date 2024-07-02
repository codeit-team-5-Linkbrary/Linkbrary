import Link from "next/link";
import LinkbraryLogo from "../public/asset/LinkbraryLogo.svg";
import Logo from "../styles/Logo.module.css";
import Label from "@/components/Label";
import Input from "@/components/Input";
import styles from "../styles/Login.module.css";
import { useCallback, useState } from "react";
import global from "../styles/LoginBox.module.css";
import signupbutton from "../styles/Button.module.css";
import axios from "axios";

const validateEmail = () => {
  const email = "string";

  if (!email) {
    return "Email is required!";
  }

  if (!email.includes("@")) {
    return "Email is invalid!";
  }

  return "";
};

const validatePassword = () => {
  if (!password) {
    return "Password is required!";
  }

  if (!password.length < 8) {
    return "Password must be at least 8 characters!";
  }

  return "";
};

const validatename = () => {
  if (!name) {
    return "Password confirmation is required!";
  }

  if (password !== name) {
    return "Passwords do not match!";
  }

  return "";
};

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleEmailInputChange = useCallback((e) => {
    setValues(e.target.value);

    const errorMessage = validateEmail(e.target.value);
    setErrors({
      ...errors,
      email: errorMessage,
    });
  }, []);

  const handlePasswordInputChange = (e) => {
    const _password = e.target.value;
    setValues(_password);

    const errorMessage = validatePassword(_password);
    setErrors({
      ...errors,
      password: errorMessage,
    });
  };

  const handlenameInputChange = (e) => {
    const _name = e.target.value;
    setValues(_name);

    const errorMessage = validatename(password, _name);
    setErrors({
      ...errors,
      name: errorMessage,
    });
  };

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    const emailErrorMessage = validateEmail(email);
    if (emailErrorMessage) {
      alert(emailErrorMessage);
      return;
    }

    const passwordErrorMessage = validateEmail(password);
    if (passwordErrorMessage) {
      alert(passwordErrorMessage);
      return;
    }

    const nameErrorMessage = validateEmail(name);
    if (nameErrorMessage) {
      alert(nameErrorMessage);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "https://linkbrary-api.vercel.app/6-5/auth/sign-up",
        {
          email,
          password,
          name,
        }
      );
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다. 관리자에게 문의해주세요!");
    } finally {
      setIsSubmitting(false);
    }

    alert("Form submitted!");
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
              이미 회원이신가요?
              <Link className={Logo.Signuplink} href="/LoginPage">
                로그인하기
              </Link>
            </p>
          </div>
        </div>

        <form className={styles.Form} onSubmit={handleRegisterFormSubmit}>
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
            onChange={handleEmailInputChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
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
            onChange={handlePasswordInputChange}
          />
          {errors.password && (
            <p className="error-password">{errors.password}</p>
          )}
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
            onChange={handlenameInputChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <button
            type="submit"
            className={signupbutton.LoginPagebutton}
            disabled={isSubmitting}
          >
            회원가입
          </button>
          <Indicator isLodaing={isSubmitting} />
          <Button variant="login" type="submit">
            회원가입
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signup;

function Indicator({ isLodaing }) {
  return <div>{isLodaing ? <p>Loaindg...</p> : <p>Loaded</p>}</div>;
}
