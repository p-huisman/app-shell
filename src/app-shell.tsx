import React, {useState} from "react";
import {createRoot} from "react-dom/client.js";
import AppShellDrawer, {AppNavItem} from "./components/navDrawer";
import AppShellHeader from "./components/header";
import {
  createDarkTheme,
  createLightTheme,
  FluentProvider,
  makeStyles,
  Theme,
} from "@fluentui/react-components";
import {AppShellState, IAppShellMessage} from "./helpers/app-shell-state";
import AppShellMessage from "./components/appShellMessage";
import {openDialog} from "./components/appShellDialog";

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
    gridTemplateAreas: "'header header' \r\n" + "'navDrawer content' \r\n",
    gridTemplateColumns: "260px calc(100vw - 260px)",
    gridTemplateRows: "70px  calc(100vh - 70px)",
  },
  content: {
    gridArea: "content",
    padding: "0 1em",
    overflow: "auto",
  },
  appArea: {
    display: "flex",
    width: "100%",
    minHeight: "calc(100% - 1em)",
    "> div": {
      width: "100%",
      margin: 0,
    },
  },
  footer: {
    height: "1em",
    fontSize: "0.9em",
  },
  notifications: {
    marginTop: "1em",
  },
});

const defaultApps: AppNavItem[] = [{title: "Dashboard", href: "./"}];

const App = () => {
  const styles = useStyles();
  const [appShellState, setAppShellState] = useState<AppShellState>(null);
  const [tick, setTick] = useState(0);
  const [theme, setTheme] = useState<Theme>(light);

  window.addEventListener(
    "initApps",
    (e: CustomEventInit) => {
      if (!appShellState) {
        const state: AppShellState = e.detail;
        setAppShellState(state);
        state.darkTheme = dark;
        state.lightTheme = light;
        setTheme(state.currentTheme);
        state.openDialog = openDialog;
      }
    },
    {once: true},
  );

  window.addEventListener("appShellStateChange", (e: CustomEventInit) => {
    setAppShellState(e.detail);
    if (e.detail.currentTheme !== theme) {
      setTheme(e.detail.currentTheme);
    }
    setTick(tick + 1);
  });

  window.dispatchEvent(new CustomEvent("appShellReady"));

  return (
    <FluentProvider theme={theme}>
      <div id="Main" className={styles.main}>
        <AppShellHeader />
        <div className={styles.content}>
          <div id="Notifications" className={styles.notifications}>
            {appShellState
              ? appShellState.messages.map(
                  (message: IAppShellMessage, index: number) => {
                    return (
                      <AppShellMessage
                        key={index}
                        body={message.body}
                        intent={message.intent}
                        onClick={() => {
                          appShellState.removeMessage(message.id);
                        }}
                      />
                    );
                  },
                )
              : null}
          </div>
          <div className={styles.appArea} id="AppArea"></div>
          <footer className={styles.footer}>(c) 2024 PGGM. Alle rechten voorbehouden.</footer>
        </div>
        {appShellState ? (
          <AppShellDrawer appNav={[...defaultApps, ...appShellState.menu]} />
        ) : null}
      </div>
    </FluentProvider>
  );
};

createRoot(rootNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
