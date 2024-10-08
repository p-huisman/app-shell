import { makeStyles } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  header: {
    gridArea: "header",
    padding: "0.5em 1em 1em 1em ",
  },
});

export const AppShellHeader = (props: Partial<any>) => {
  const styles = useStyles();
  return (
    <header id="Header" className={styles.header}>
      
    </header>
  );
};

export default AppShellHeader;
