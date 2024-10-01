import React, { useState } from "react";
import loginDataType from "../../common/types/loginType";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthLoginService from "../../services/authService";
import { Link } from "react-router-dom";
import styles from "../Login/Login.module.scss";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<loginDataType>({
    email: "",
    password: "",
  });

  const [apiError, setApiError] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    AuthLoginService(loginData).then((response: any) => {
      if (response.error) {
        setShow(true);
        setApiError(response.error);
      } else if (response) {
        if (response.headers && response.headers["x-csrf-token"]) {
          sessionStorage.setItem("csrf", response.headers["x-csrf-token"]);
        }
        sessionStorage.setItem("token", response.data.token);
        navigate("/app/home");
        setApiError("");
      }
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.inputsContainer1}>
        <Form
          className={`shadow p-4 bg-white rounded ${styles.loginForm}`}
          onSubmit={handleSubmit}
          data-testid="loginForm"
        >
          <div className="h5 mb-2 text-start login-text">Login</div>
          {show ? (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              {apiError}
            </Alert>
          ) : (
            <div />
          )}
          
          <Form.Group className="mb-2" controlId="email">
            <Form.Control
              type="email"
              name="email"
              className={styles.formInput}
              placeholder="Enter Email"
              value={loginData.email}
              onChange={handleOnChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Control
              type="password"
              name="password"
              className={styles.formInput}
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <div className={styles.loginFooter}>
            <Button
              type="submit"
              id="loginSubmitButton"
              className={styles.loginSubmitButton}
              data-testid="signup-button"
            >
              Login
            </Button>
            <label id="loginInLink" className={styles.loginInLink}>
              {" "}
              New user ? <Link id="registerLink" to="/signup">Register</Link>
            </label>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
