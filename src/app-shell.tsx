import React, {useState} from "react";
import {createRoot} from "react-dom/client.js";

import AppShellDrawer, {AppNavItem} from "./components/navDrawer";
import AppShellHeader from "./components/header";

import {
  createDarkTheme,
  createLightTheme,
  FluentProvider,
  makeStyles,
  webLightTheme,
} from "@fluentui/react-components";

const myBrand = {
  "10": "#000000",
  "20": "#011800",
  "30": "#002700",
  "40": "#00360c",
  "50": "#004612",
  "60": "#005618",
  "70": "#00671f",
  "80": "#1d8551", 
  "90": "#218935",
  "100": "#3e9949",
  "110": "#59a85e",
  "120": "#73b776",
  "130": "#8ec68f",
  "140": "#aad5a9",
  "150": "#c6e4c5",
  "160": "#e2f2e2",
};

const light = createLightTheme(myBrand);
const dark = createDarkTheme(myBrand);

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

const defaultApps: AppNavItem[] = [{title: "Dashboard", href: "./"}];

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
    <FluentProvider theme={light}>
      <App />
    </FluentProvider>
  </React.StrictMode>,
);
