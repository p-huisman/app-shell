import {makeStyles} from "@fluentui/react-components";
import * as React from "react";

const cs = new CSSStyleSheet();
cs.replaceSync(`
    @keyframes indeterminateAnimation {
      0% {
        transform:  translateX(-50%) scaleX(0);
      }
      0% {
        transform:  translateX(-50%) scaleX(0.4);
      }
      100% {
        transform:  translateX(150%) scaleX(0.5);
      }
    }
    `);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, cs];

const useStyles = makeStyles({
  progressbar: {
    height: "1px",
    width: "100%",
    overflow: "hidden",
    visibility: "hidden",
    opacity: 0,
    position: "absolute",
  },
  progresbarVisible: {
    height: "1px",
    backgroundColor: "var(--colorBrandBackground2)",
    width: "100%",
    overflow: "hidden",
    visibility: "visible",
  },
  progressbarValue: {
    width: "100%",
    height: "1px",
    backgroundColor: "var(--colorBrandBackground)",
    backgroundImage:
      "linear-gradient(to right, var(--colorNeutralBackground6) 0%, var(--colorBrandBackground) 50%, var(--colorNeutralBackground6) 100%)",
    animation: "indeterminateAnimation 1.1s infinite linear",
    transformOrigin: "0% 50%",
  },
  progressbarLabel: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
    margin: "-1",
    visibility: "hidden",
  },
});

export interface AppShellProgressProps {
  active?: boolean;
}
export const AppShellProgress = (props: AppShellProgressProps) => {
  const styles = useStyles();
  return (
    <div role="progressbar" aria-describedby="#ProgressbarLabel" aria-hidden={props.active ? "false": "true"} >
      {props.active}
      <div
        className={props.active ? styles.progresbarVisible : styles.progressbar}
      >
        <div className={styles.progressbarValue}></div>
      </div>
      <label id="ProgressbarLabel" className={styles.progressbarLabel}>
        Loading...
      </label>
    </div>
  );
};

export default AppShellProgress;
