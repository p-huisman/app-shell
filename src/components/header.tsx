import {Button, makeStyles, MenuGroup, MenuGroupHeader, tokens} from "@fluentui/react-components";
import React, {useEffect, useState} from "react";
import {
  Avatar,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from "@fluentui/react-components";

import Logo from "./logo";

const useStyles = makeStyles({
  header: {
    gridArea: "header",
    padding: "0.5em 1em 1em 1em ",
    display: "flex",
    gap: ".5em",
    justifyContent: "space-between",
    borderBottom: tokens.colorNeutralBackground6,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
  },
  headerCol1: {
    flex: 1,
  },
  headerCol2: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  }
});



export const AppShellHeader = () => {
  const styles = useStyles();

  return (
    <header id="Header" className={styles.header}>
      <div className={styles.headerCol1}>
        <Logo />
      </div>
      <div className={styles.headerCol2}>
      </div>
    </header>
  );
};

export default AppShellHeader;
