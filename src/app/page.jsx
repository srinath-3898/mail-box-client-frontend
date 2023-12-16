"use client";
import { Select, message } from "antd";
import styles from "./Home.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/users/usersActions";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import Loader from "@/components/Loader/Loader";
import { resetUsersData } from "@/store/users/usersSlice";
import { sendMail } from "@/store/mail/mailActions";
import { resetMailData } from "@/store/mail/mailSlice";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Home() {
  const dispatch = useDispatch();
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const { loading, users, error } = useSelector((state) => state.users);
  const {
    loading: mailLoading,
    message: mailMessage,
    error: mailError,
  } = useSelector((state) => state.mail);

  const [searchString, setSearchString] = useState("");
  const [mail, setMail] = useState({ to: "", subject: "", content: "" });
  const [errors, setErrors] = useState({ to: "", subject: "", content: "" });

  const [messageApi, contextHolder] = message.useMessage();

  const handleEditorChange = (newContent) => {
    setMail((prevState) => ({ ...prevState, content: newContent }));
  };

  const validateSenEmail = () => {
    const errors = {};
    if (!mail.to) {
      errors.to = "Please select a user";
    }
    if (!mail.subject) {
      errors.subject = "Subject is required";
    } else if (mail.subject) {
      if (mail.subject.trim().length === 0) {
        errors.subject = "Subject is required";
      }
    }
    if (!mail.content) {
      errors.content = "Content is required";
    } else if (mail.content) {
      if (mail.content.trim().length === 0) {
        errors.content = "Subject is required";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendMail = (event) => {
    event.preventDefault();
    if (validateSenEmail()) {
      dispatch(sendMail(mail));
    }
  };

  useEffect(() => {
    if (searchString) {
      const identifier = setTimeout(() => {
        dispatch(fetchUsers(searchString));
      }, 500);
      return () => clearTimeout(identifier);
    } else {
      dispatch(resetUsersData());
      return;
    }
  }, [searchString]);

  useEffect(() => {
    if (mailMessage || mailError) {
      messageApi.open({
        type: mailMessage ? "success" : "error",
        content: mailMessage ? mailMessage : mailError,
      });
      dispatch(resetMailData());
    }
  }, [mailMessage, mailError]);

  console.log(users);

  return (
    <>
      {contextHolder}
      <form className={styles.container} onSubmit={handleSendMail}>
        <div className={styles.send_to}>
          <p>To</p>
          <input
            type="text"
            placeholder={mail?.to ? "" : "Search with user email address"}
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
          />
          {errors.to ? (
            <p className={styles.validation_error}>{errors.to}</p>
          ) : (
            <></>
          )}
          {users ? (
            users?.length > 0 ? (
              <div className={styles.users}>
                {users?.map((user) => (
                  <p
                    key={user?.id}
                    className={styles.user}
                    onClick={() => {
                      setSearchString("");
                      setMail((prevState) => ({
                        ...prevState,
                        to: user?.email,
                      }));
                    }}
                  >
                    {user?.email}
                  </p>
                ))}
              </div>
            ) : (
              <p className={styles.no_users}>No users found</p>
            )
          ) : (
            <></>
          )}
          {loading ? (
            <div className={styles.users_loading}>
              <Loader size={20} />
            </div>
          ) : (
            <></>
          )}
          {mail?.to ? (
            <div className={styles.selected_user}>
              <p>{mail.to}</p>
              <CloseOutlined
                onClick={() =>
                  setMail((prevState) => ({ ...prevState, to: "" }))
                }
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.subject}>
          <p>Subject</p>
          <input
            type="text"
            placeholder="Please provide a subject"
            onChange={(event) =>
              setMail((prevState) => ({
                ...prevState,
                subject: event.target.value,
              }))
            }
          />
          {errors.subject ? (
            <p className={styles.validation_error}>{errors.subject}</p>
          ) : (
            <></>
          )}
        </div>
        <QuillEditor
          value={mail.content}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className={styles.editor}
        />
        {errors.content ? (
          <p className={styles.validation_error}>{errors.content}</p>
        ) : (
          <></>
        )}
        <button
          type="submit"
          className={styles.send_btn}
          disabled={mailLoading}
        >
          {mailLoading ? (
            <LoadingOutlined style={{ color: "white", fontSize: 15 }} />
          ) : (
            "Send"
          )}
        </button>
      </form>
    </>
  );
}
