import React, {useState} from "react";
import {createRoot} from "react-dom/client.js";
import AppShellDrawer, {AppNavItem} from "./components/navDrawer";
import AppShellHeader from "./components/header";
import {
  createDarkTheme,
  createLightTheme,
  FluentProvider,
  makeStaticStyles,
  makeStyles,
  Theme,
} from "@fluentui/react-components";
import {AppShellState, IAppShellMessage} from "./helpers/app-shell-state";
import AppShellMessage from "./components/appShellMessage";
import {openDialog} from "./components/appShellDialog";
import AppShellProgress from "./components/appShellProgress";

const rootNode = document.getElementById("app-shell");
if (!rootNode) {
  throw new Error("No root element found");
}

const useStaticStyles = makeStaticStyles({
  body: {
    margin: 0,
    padding: 0,
  },
});

const useStyles = makeStyles({
  main: {
    margin: 0,
    display: "grid",
    height: "100vh",
    gridTemplateAreas: "'header header' \r\n" + "'navDrawer content' \r\n",
    gridTemplateColumns: "260px calc(100vw - 260px)",
    gridTemplateRows: "70px  calc(100vh - 70px)",
  },
  progressbar: {
    gridArea: "header",
    zIndex: 100,
    position: "absolute",
    top: "70px",
    left: 0,
    width: "100%",
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

const defaultApps: AppNavItem[] = [{title: "Dashboard", href: "./", icon: null}];

const App = () => {
  useStaticStyles();
  const styles = useStyles();
  const [appShellState, setAppShellState] = useState<AppShellState>(null);
  const [tick, setTick] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [theme, setTheme] = useState<Theme>(null);

  window.addEventListener(
    "initApps",
    (e: CustomEventInit) => {
      if (!appShellState) {
        const state: AppShellState = e.detail;
        setAppShellState(state);

        const light = createLightTheme(state.themeColors);
        const dark = createDarkTheme(state.themeColors);

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
    setInProgress(e.detail.inProgress);
    setTick(tick + 1);
  });

  window.dispatchEvent(new CustomEvent("appShellReady"));

  return (
    <FluentProvider theme={theme}>
      <div id="Main" className={styles.main}>
        <AppShellHeader />
        <div className={styles.progressbar}>
          <AppShellProgress  active={inProgress} />
        </div>
        <div className={styles.content}>
          <div id="Notifications" className={styles.notifications}>
            {appShellState
              ? appShellState.messages.map(
                  (message: IAppShellMessage, index: number) => {
                    return (
                      <AppShellMessage
                        id={message.id}
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
          <footer className={styles.footer}>
            (c) 2024 PGGM. Alle rechten voorbehouden.
          </footer>
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
