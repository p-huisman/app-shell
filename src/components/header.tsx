import {makeStyles, MenuGroupHeader} from "@fluentui/react-components";
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

const useStyles = makeStyles({
  header: {
    gridArea: "header",
    padding: "0.5em 1em 1em 1em ",
    display: "flex",
    gap: ".5em",
    justifyContent: "flex-end",
  },
  avatar: {
    cursor: "pointer",
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
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Avatar
            data-href="oauth"
            className={styles.avatar}
            aria-label={userName}
            name={userName}
            color="brand"
          ></Avatar>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {userName !== "" ? (
              <MenuGroupHeader>{userName}</MenuGroupHeader>
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
    </header>
  );
};

export default AppShellHeader;
