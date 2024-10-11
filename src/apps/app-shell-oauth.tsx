import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import {authenticate} from "../helpers/oauth";

const OAuth = () => {
  authenticate();
  return (
    <div id="oauth">
      Even geduld a.u.b. ...
    </div>
  );
};

export const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: OAuth,
  errorBoundary(err) {
    return <div>Fatal error ${err.message} </div>;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
