import React, { useState } from "react";
import { createRoot } from "react-dom/client.js";

import AppShellDrawer, { AppNavItem } from "./components/navDrawer";
import AppShellHeader from "./components/header";

import {
  FluentProvider,
  makeStyles,
  webLightTheme,
} from "@fluentui/react-components";

const rootNode = document.getElementById("app-shell");
if (!rootNode) {
  throw new Error("No root element found");
}
const useStyles = makeStyles({
  main: {
    margin: 0,
    display: "grid",
    height: "100vh",
    gridTemplateAreas: "'navDrawer header' \r\n" + "'navDrawer content' \r\n",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "auto 1fr",
  },
  content: {
    gridArea: "content",
    padding: "0 1em",
  },
});

const defaultApps: AppNavItem[] = [{ title: "Dashboard", href: "./" }];

const App = () => {
  const styles = useStyles();
  const [apps, setApps] = useState(defaultApps);
  window.addEventListener("initApps", (e: CustomEventInit) => {
    setApps([...defaultApps, ...e.detail]);
  });
  window.dispatchEvent(new CustomEvent("appShellReady"));
  return (
    <div id="main" className={styles.main}>
      <AppShellHeader />
      <div id="Content" className={styles.content}></div>
      <AppShellDrawer appNav={apps} />
    </div>
  );
};

createRoot(rootNode).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
