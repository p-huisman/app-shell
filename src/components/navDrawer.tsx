import React from "react";

import {
  AppItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerSlots,
  NavProps,
} from "@fluentui/react-nav-preview";

import {makeStyles, tokens, ComponentProps} from "@fluentui/react-components";

const useStyles = makeStyles({
  navDrawer: {
    gridArea: "navDrawer",
    display: "flex",
    flexDirection: "column",
    background: tokens.colorNeutralBackground4,
  },
  icon: {
    color: "var(--colorNeutralForeground2)",
    width: "24px",
    height: "24px",
  },
});

export type AppNavItem = {
  title: string;
  href: string;
  icon?: string;
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

  const defaultAppIcon = (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m17.751 3 .185.005a3.25 3.25 0 0 1 3.06 3.06l.005.185v11.5l-.005.184A3.25 3.25 0 0 1 17.751 21H6.25a3.25 3.25 0 0 1-3.245-3.066L3 17.75V6.25a3.25 3.25 0 0 1 3.066-3.245L6.25 3h11.501ZM19.5 8H4.501L4.5 17.75a1.75 1.75 0 0 0 1.606 1.744l.144.006h11.501l.144-.006a1.75 1.75 0 0 0 1.6-1.593l.006-.151L19.5 8Zm-9.25 1.5a.75.75 0 0 1 .743.648l.007.102v7a.75.75 0 0 1-.648.743L10.25 18h-3.5a.75.75 0 0 1-.743-.648L6 17.25v-7a.75.75 0 0 1 .648-.743L6.75 9.5h3.5ZM9.5 11h-2v5.5h2V11Zm6.75 1.503a.75.75 0 0 1 .102 1.493l-.102.007h-3.496a.75.75 0 0 1-.101-1.493l.101-.007h3.496Zm1-3.003a.75.75 0 0 1 .102 1.493L17.25 11h-4.496a.75.75 0 0 1-.101-1.493l.101-.007h4.496Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div id="NavDrawer" className={styles.navDrawer} ref={this}>
      <NavDrawer type="inline" open={true}>
        <NavDrawerBody>
          {props.appNav.map((navItem, index) => {
            return navItem?.title && navItem?.href ? (
              <AppItem
                key={index}
                as="a"
                icon={
                  navItem?.icon ? (
                    <img className={styles.icon} src={navItem.icon} />
                  ) : (
                    defaultAppIcon
                  )
                }
                href={navItem.href}
                onClick={(e) => {
                  e.preventDefault();
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
