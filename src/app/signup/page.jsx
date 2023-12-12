"use client";
import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import { signup } from "@/store/auth/authActions";

const Signup = () => {
  const dispatch = useDispatch();

  const {
    loading,
    message: authMessage,
    error,
  } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!userDetails.fullName) {
      errors.fullName = "Name is required";
    } else if (userDetails.fullName) {
      if (userDetails.fullName.trim().length === 0) {
        errors.fullName = "Please enter a valid name";
      }
    }
    if (!userDetails.email) {
      errors.email = "Email is required";
    } else if (userDetails.email) {
      if (userDetails.email.trim().length === 0) {
        errors.email = "Please enter a valid email";
      } else if (!/\S+@\S+\.\S+/.test(userDetails?.email)) {
        errors.email = "Please enter a valid email";
      }
    }
    if (!userDetails.mobile) {
      errors.mobile = "User Mobile is required";
    } else if (userDetails.mobile) {
      if (
        userDetails.mobile.trim().length < 10 ||
        userDetails.mobile.trim().length > 10
      ) {
        errors.mobile = "Please enter 10 digit mobile number";
      } else if (!/^[0-9]{10}$/.test(userDetails.mobile)) {
        errors.mobile = "Please enter numbers only from 0-9";
      }
    }
    if (userDetails.password?.length === 0) {
      errors.password = "Password is required";
    } else if (userDetails.password?.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
        userDetails?.password
      )
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    } else if (!/((^\S+$))/.test(userDetails?.password)) {
      errors.password = "Password should not contain white spaces";
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      errors.confirmPassword = "Password didn't matched";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(signup(userDetails));
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

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>SignUp</h1>
          <form className={styles.signup_form} onSubmit={handleSubmit}>
            <div className={styles.input_controller}>
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                id="full_name"
                placeholder="Please enter your full name"
                name="fullName"
                value={userDetails.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName ? (
              <p className={styles.validation_error}>{errors.fullName}</p>
            ) : (
              <></>
            )}
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
              <label htmlFor="mobile">Mobile</label>
              <input
                type="tel"
                id="mobile"
                placeholder="Please enter your mobile nummber"
                name="mobile"
                value={userDetails.mobile}
                onChange={handleChange}
              />
            </div>
            {errors.mobile ? (
              <p className={styles.validation_error}>{errors.mobile}</p>
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
            <div className={styles.input_controller}>
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                placeholder="Please confirm your password"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword ? (
              <p className={styles.validation_error}>
                {errors.confirmPassword}
              </p>
            ) : (
              <></>
            )}
            <button type="submit">
              {loading ? (
                <LoadingOutlined style={{ color: "white", fontSize: 15 }} />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
