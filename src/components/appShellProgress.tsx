import {makeStyles} from "@fluentui/react-components";
import * as React from "react";

const cs = new CSSStyleSheet();
cs.replaceSync(`
    @keyframes indeterminateAnimation {
      0% {
        transform:  translateX(0) scaleX(0);
      }
      0% {
        transform:  translateX(0) scaleX(0.4);
      }
      100% {
        transform:  translateX(100%) scaleX(0.5);
      }
    }
    `);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, cs];

const useStyles = makeStyles({
  progressBar: {
    height: "1px",
    width: "100%",
    overflow: "hidden",
    visibility: "hidden",
    opacity: 0,
  },
  progresBarVisible: {
    height: "1px",
    backgroundColor: "var(--colorBrandBackground2)",
    width: "100%",
    overflow: "hidden",
    visibility: "visible",
    opacity: .8,
  },
  progressBarValue: {
    width: "100%",
    height: "100%",
    backgroundColor: "var(--colorBrandBackground)",
    animation: "indeterminateAnimation .8s infinite linear",
    transformOrigin: "0% 50%",
  },
});

export interface AppShellProgressProps {
  active?: boolean;
}
export const AppShellProgress = (props: AppShellProgressProps) => {
  const styles = useStyles();
  return (
    <div>
      {props.active}
      <div
        className={props.active ? styles.progresBarVisible : styles.progressBar}
      >
        <div className={styles.progressBarValue}></div>
      </div>
    </div>
  );
};

export default AppShellProgress;
