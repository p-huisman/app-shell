import { Button } from "@fluentui/react-components";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

const Dashboard = (props: Partial<any>) => {
  const {appShellState} = props;
  appShellState?.openDialog("Hello", "info");
  return (
    
    <div id="dashboard">
      App {new Date().toLocaleTimeString()}
      <p>
        <Button onClick={() => appShellState.addMessage("Hello", "info")}>
          Add Message
        </Button>
        <Button
          onClick={() => {
            const body = document.createElement("div");
            body.innerHTML = "Hello";
            appShellState.addMessage(body, "error");
          }}
        >
          Add Message
        </Button>
        <Button
          onClick={() => {
            const body = () => <div>Lala</div>;
            body.innerHTML = "Hello";
            appShellState.addMessage(body, "success");
          }}
        >
          Add Message
        </Button>
      </p>
      <p>

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
