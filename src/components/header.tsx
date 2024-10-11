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

import {getUserInfo} from "../helpers/oauth";
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
  },
  avatarButton: {
    appearance: "none",
    border: "none",
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
    cursor: "pointer",
    minWidth: "unset",
    "&:hover": {
      "--colorBrandBackgroundStatic": "var(--colorCompoundBrandBackgroundHover)",
    },
    "&:hover:active": {
      border: "none",
      backgroundColor: "transparent",
    }
  }
});

export const AppShellHeader = () => {
  const styles = useStyles();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    window.addEventListener("oauthDone", () => {
      userInfo();
    });
    userInfo();
  }, []);

  async function userInfo() {
    const userInfo = await getUserInfo();
    setUserName(userInfo ? userInfo.name : "");
  }

  return (
    <header id="Header" className={styles.header}>
      <div className={styles.headerCol1}>
        <Logo />
      </div>
      <div className={styles.headerCol2}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button className={styles.avatarButton}>
          <Avatar
            data-href="oauth"

            aria-label={userName}
            name={userName}
            color="brand"
          ></Avatar>
          </Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {userName !== "" ? (
              <MenuGroup>
              <MenuGroupHeader><strong>{userName}</strong></MenuGroupHeader>
              </MenuGroup>
            ) : null }
            {userName === "" ? (
              <MenuItem
                data-href="oauth"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  const menuItem = target.closest(
                    `[role="menuitem"]`,
                  ) as HTMLElement;
                  const link =
                    new URL(document.querySelector("base").href).pathname +
                    menuItem.dataset.href;
                  history.pushState({}, "", link);
                }}
              >
                Login
              </MenuItem>
            ) : (
              <MenuItem
                data-href="oauth/logout"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  const menuItem = target.closest(
                    `[role="menuitem"]`,
                  ) as HTMLElement;
                  const link =
                    new URL(document.querySelector("base").href).pathname +
                    menuItem.dataset.href;
                  history.pushState({}, "", link);
                }}
              >
                Logout
              </MenuItem>
            )}
          </MenuList>
        </MenuPopover>
      </Menu>
      </div>
    </header>
  );
};

export default AppShellHeader;
