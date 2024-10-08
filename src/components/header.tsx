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
      <a
        href="oauth"
        onClick={(e) => {
          e.preventDefault();
          const target = e.target as HTMLAnchorElement;
          history.pushState({}, "", target.href);
        }}
      >
        Login
      </a>
      &nbsp;|&nbsp;
      <a
        href="oauth/logout"
        onClick={(e) => {
          e.preventDefault();
          const target = e.target as HTMLAnchorElement;
          history.pushState({}, "", target.href);
        }}
      >
        Logout
      </a>
    </header>
  );
};

export default AppShellHeader;
