import { ComponentProps } from "@fluentui/react-components";
import React from "react";

import {
  AppItem,
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavDrawerSlots,
  NavItem,
  NavProps,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from "@fluentui/react-nav-preview";

import {makeStyles, tokens } from "@fluentui/react-components";

import {
  Board20Filled,
  Board20Regular,
  bundleIcon,
} from "@fluentui/react-icons";

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
      <NavSectionHeader><Logo /></NavSectionHeader>
      <NavDrawer
        type="inline"
        open={true}
      >
        <NavDrawerBody>
          {props.appNav.map((navItem, index) => {
            return (
              <AppItem
                key={index}
                as="a"
                icon={<Dashboard />}
                href={navItem.href}
                onClick={(e) => {
                  e.preventDefault();
                  history.pushState({}, "", navItem.href);
                }}
              >
                {navItem.title}
              </AppItem>
            );
          })}
        </NavDrawerBody>
      </NavDrawer>
    </div>
  );
};

export default AppShellDrawer;
