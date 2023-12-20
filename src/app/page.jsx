"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { getMails } from "@/store/mail/mailActions";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const dispatch = useDispatch();

  const { getMailsLoading, mails, getMailsError } = useSelector(
    (state) => state.mail
  );

  useEffect(() => {
    dispatch(getMails());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_1}></div>
      {getMailsLoading ? <Loader size={50} /> : <></>}
      {mails ? (
        mails?.length > 0 ? (
          <div className={styles.container_2}>
            {mails?.map((mail) => (
              <div
                key={mail?.id}
                className={`${styles.mail} ${
                  !mail?.read ? styles.mail_un_read : ""
                }`}
              >
                <input type="checkbox" />
                <div className={styles.sender_name}>
                  {mail?.read ? <></> : <div className={styles.circle}></div>}
                  <p>{mail?.senderMail}</p>
                </div>
                <p>{mail?.subject}</p>
                <p>{new Date(mail?.createdAt).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
