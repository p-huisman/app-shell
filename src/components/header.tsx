import {makeStyles} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";

import { getUserInfo } from "../helpers/oauth";

const useStyles = makeStyles({
  header: {
    gridArea: "header",
    padding: "0.5em 1em 1em 1em ",
    display: "flex",
    gap: "1em",
  },
  
});

;

export const AppShellHeader = () => {
  const styles = useStyles();
  const[userName, setUserName] = useState("")
  useEffect(() => {
    window.addEventListener("oauthDone", () => {
        userInfo();
    });
    userInfo();
  }, [])

  async function userInfo(){
      const userInfo = await getUserInfo();
      setUserName(userInfo ? userInfo.name : "");
  }
  
  
  return (
    <header id="Header" className={styles.header}>
      {userName ? <span>{userName}</span>: null}
      {userName === "" ? <a
        href="oauth"
        onClick={(e) => {
          e.preventDefault();
          const target = e.target as HTMLAnchorElement;
          history.pushState({}, "", target.href);
        }}
      >
        Login
      </a> : <a
        href="oauth/logout"
        onClick={(e) => {
          e.preventDefault();
          const target = e.target as HTMLAnchorElement;
          history.pushState({}, "", target.href);
        }}
      >
        Logout
      </a>}
      
    </header>
  );
};

export default AppShellHeader;
