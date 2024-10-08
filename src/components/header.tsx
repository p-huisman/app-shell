import { makeStyles } from "@fluentui/react-components";
import React from "react";

const pathName = new URL(document.querySelector("base").href || "/").pathname;

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
        <button onClick={() => history.pushState({}, "", pathName + "oauth")}>Login</button>
        <button onClick={() => history.pushState({}, "", pathName + "oauth/logout")}>Logout</button>
    </header>
  );
};

export default AppShellHeader;
