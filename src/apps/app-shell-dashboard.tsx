import {Button, makeStyles} from "@fluentui/react-components";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import {AppShellState} from "../helpers/app-shell-state";
import {IAppShellDialogAction} from "../components/appShellDialog";

const useStyles = makeStyles({
  buttonRow: {
    display: "flex",
    gap: ".5em",
  },
});

const Dashboard = (props: Partial<any>) => {
  const state = props.appShellState as AppShellState;
  const styles = useStyles();
  return (
    <div id="dashboard">
      <h1>App-shell</h1>
      <p className={styles.buttonRow}>
        <Button onClick={() => state.addMessage("Hello", "info")}>
          Add Message
        </Button>
        <Button
          onClick={() => {
            const body = document.createElement("div");
            body.innerHTML = "Hello";
            state.addMessage(body, "error");
          }}
        >
          Add Message
        </Button>
        <Button
          appearance="primary"
          onClick={() => {
            const body = (<div>Lala</div>) as JSX.Element;
            state.addMessage(body, "success");
          }}
        >
          Add Message
        </Button>
      </p>

      <p className={styles.buttonRow}>
        <Button
          onClick={() => {
            const actions: IAppShellDialogAction[] = [
              {
                id: "close",
                label: "Nee",
              },
              {
                id: "open",
                label: "Ja",
              },
            ];
            // open a dialog
            state.openDialog({
              body: <div>Doorgaan met het downloaden van de bestanden?</div>,
              title: <div>Downloaden</div>,
              modal: true,
              theme: state.currentTheme,
              actions,
            }).then((actionId) => {
              console.log(`Dialog closed with action: ${actionId}`);
              window.dispatchEvent(new CustomEvent("startAppShellTask", {bubbles: true, composed: true}));
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent("finishAppShellTask", {bubbles: true, composed: true}));
              }, 3000);
            });
          }}
        >
          Open Dialog
        </Button>
      </p>
    </div>
  );
};

export const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Dashboard,
  errorBoundary(err) {
    return <div>Fatal error ${err.message} </div>;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
