import React from "react";
import styles from "./../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingTop}>
        <div className={styles.loadingTopInner}></div>
      </div>
    </div>
  );
};

export default Loading;