import {makeStyles} from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  header: {
    gridArea: "header",
    padding: "0.5em 1em 1em 1em ",
  },
});

export const AppShellHeader = () => {
  const styles = useStyles();
  return (
    <header id="Header" className={styles.header}>
      <button
        onClick={() => {
          const url = new URL(document.querySelector("base").href + "oauth");
          console.log(url.pathname);
          history.pushState({}, "", url.pathname);
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
            const url = new URL(document.querySelector("base").href + "oauth/logout");
            console.log(url.pathname);
            history.pushState({}, "", url.pathname);
          }}
      >
        Logout
      </button>
    </header>
  );
};

export default AppShellHeader;
