"use client";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { login } from "@/store/auth/authActions";
import { useRouter } from "next/navigation";
import { setError, setMessage } from "@/store/auth/authSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    loading,
    token,
    message: authMessage,
    error,
  } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateLoginForm = () => {
    const errors = {};
    if (!userDetails.email) {
      errors.email = "Email is required";
    } else if (userDetails.email) {
      if (userDetails.email.trim().length === 0) {
        errors.email = "Please enter a valid email";
      } else if (!/\S+@\S+\.\S+/.test(userDetails?.email)) {
        errors.email = "Please enter a valid email";
      }
    }
    if (!userDetails.password) {
      errors.password = "Password is required";
    } else if (userDetails.password) {
      if (userDetails.password.trim().length === 0) {
        errors.password = "Invalid password";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateLoginForm()) {
      dispatch(login(userDetails));
    }
  };

  useEffect(() => {
    if (authMessage || error) {
      messageApi.open({
        type: authMessage ? "success" : "error",
        content: authMessage ? authMessage : error,
      });
    }
  }, [authMessage, error]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/`;
      setUserDetails({ email: "", password: "" });
      router.push("/");
      dispatch(setMessage(null));
      dispatch(setError(null));
    }
  }, [token]);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Login</h1>
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <div className={styles.input_controller}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Please enter your email address"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>
            {errors.email ? (
              <p className={styles.validation_error}>{errors.email}</p>
            ) : (
              <></>
            )}
            <div className={styles.input_controller}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Please enter your password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
              />
            </div>
            {errors.password ? (
              <p className={styles.validation_error}>{errors.password}</p>
            ) : (
              <></>
            )}
            <button type="submit" disabled={loading}>
              {loading ? (
                <LoadingOutlined style={{ color: "white", fontSize: 15 }} />
              ) : (
                "Login"
              )}
            </button>
            <span>
              {`Don't have an account?`}{" "}
              <Link href={"/signup"} className={styles.login_link}>
                Signup
              </Link>{" "}
              to continue
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
