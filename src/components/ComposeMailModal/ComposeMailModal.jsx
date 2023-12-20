import { sendMail } from "@/store/mail/mailActions";
import { fetchUsers } from "@/store/users/usersActions";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import styles from "./ComposeMailModal.module.css";
import { resetUsersData } from "@/store/users/usersSlice";
import { resetMailData } from "@/store/mail/mailSlice";

const ComposeMailModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const { loading, users, error } = useSelector((state) => state.users);
  const {
    loading: mailLoading,
    message: mailMessage,
    error: mailError,
  } = useSelector((state) => state.mail);

  const [searchString, setSearchString] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [mail, setMail] = useState({
    recipientId: null,
    subject: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    selectedUser: "",
    subject: "",
    content: "",
  });
  const [messageApi, contextHolder] = message.useMessage();

  const validateSenEmail = () => {
    const errors = {};
    if (!selectedUser) {
      errors.selectedUser = "Please select a user";
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

  const handleCancel = () => {
    setSearchString("");
    setSearchString(null);
    setMail((prevState) => ({
      ...prevState,
      recipientId: null,
      subject: "",
      content: "",
    }));
    setErrors((prevState) => ({
      ...prevState,
      selectedUser: "",
      subject: "",
      content: "",
    }));
    setOpen(false);
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
    if (selectedUser) {
      setMail((prevState) => ({ ...prevState, recipientId: selectedUser?.id }));
    } else {
      setMail((prevState) => ({ ...prevState, recipientId: null }));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (mailMessage || mailError) {
      messageApi.open({
        type: mailMessage ? "success" : "error",
        content: mailMessage ? mailMessage : mailError,
      });
      dispatch(resetMailData());
      if (mailMessage) {
        setSearchString("");
        setSelectedUser(null);
        setMail((prevState) => ({
          ...prevState,
          recipientId: null,
          subject: "",
          content: "",
        }));
      }
    }
  }, [mailMessage, mailError]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Compose Email"
        open={open}
        footer={null}
        centered
        onCancel={handleCancel}
      >
        <form className={styles.container} onSubmit={handleSendMail}>
          <div className={styles.send_to}>
            <p>To</p>
            <input
              type="text"
              placeholder={selectedUser ? "" : "Search with user email address"}
              value={searchString}
              onChange={(event) => {
                setSearchString(event.target.value);
                setErrors((prevState) => ({ ...prevState, selectedUser: "" }));
              }}
            />
            {users ? (
              users?.length > 0 ? (
                <div className={styles.users}>
                  {users?.map((user) => (
                    <p
                      key={user?.id}
                      className={styles.user}
                      onClick={() => {
                        setSearchString("");
                        setSelectedUser(user);
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
            {error ? <p className={styles.users_error}>{error}</p> : <></>}
            {selectedUser ? (
              <div className={styles.selected_user}>
                <p>{selectedUser?.email}</p>
                <CloseOutlined onClick={() => setSelectedUser(null)} />
              </div>
            ) : (
              <></>
            )}
          </div>
          {errors.selectedUser ? (
            <p className={styles.validation_error}>{errors.selectedUser}</p>
          ) : (
            <></>
          )}
          <div className={styles.subject}>
            <p>Subject</p>
            <input
              type="text"
              placeholder="Please provide a subject"
              onChange={(event) => {
                setMail((prevState) => ({
                  ...prevState,
                  subject: event.target.value,
                }));
                setErrors((prevState) => ({ ...prevState, subject: "" }));
              }}
            />
          </div>
          {errors.subject ? (
            <p className={styles.validation_error}>{errors.subject}</p>
          ) : (
            <></>
          )}
          <div>
            <textarea
              name="content"
              id="content"
              className={styles.content}
              value={mail.content}
              onChange={(event) => {
                setMail((prevState) => ({
                  ...prevState,
                  content: event.target.value,
                }));
                setErrors((prevState) => ({ ...prevState, content: "" }));
              }}
            ></textarea>
            {errors.content ? (
              <p className={styles.validation_error}>{errors.content}</p>
            ) : (
              <></>
            )}
          </div>
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
      </Modal>
    </>
  );
};

export default ComposeMailModal;
