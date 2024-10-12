import React from "react";

import {
  AppItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerSlots,
  NavProps,
  NavSectionHeader,
} from "@fluentui/react-nav-preview";

import {makeStyles, tokens, ComponentProps} from "@fluentui/react-components";

import {Board20Filled, Board20Regular, bundleIcon} from "@fluentui/react-icons";

import Logo from "./logo";

const useStyles = makeStyles({
  navDrawer: {
    gridArea: "navDrawer",
    display: "flex",
    flexDirection: "column",
    background: tokens.colorNeutralBackground4,
  },
});

const Dashboard = bundleIcon(Board20Filled, Board20Regular);

export type AppNavItem = {
  title: string;
  href: string;
  subItems?: AppNavItem[];
};

export interface AppShellNavProps {
  appNav: AppNavItem[];
}

export declare type AppShellNavDrawerProps = ComponentProps<NavDrawerSlots> &
  NavProps &
  AppShellNavProps;

export const AppShellDrawer = (props: Partial<AppShellNavDrawerProps>) => {
  const styles = useStyles();
  return (
    <div id="NavDrawer" className={styles.navDrawer} ref={this}>
      <NavDrawer type="inline" open={true}>
        <NavDrawerBody>
          {props.appNav.map((navItem, index) => {
            return navItem?.title && navItem?.href ? (
              <AppItem
                key={index}
                as="a"
                icon={<Dashboard />}
                href={navItem.href}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("navItem.href", navItem.href);
                  history.pushState({}, "", navItem.href);
                }}
              >
                {navItem.title}
              </AppItem>
            ) : null;
          })}
        </NavDrawerBody>
      </NavDrawer>
    </div>
  );
};

export default AppShellDrawer;
