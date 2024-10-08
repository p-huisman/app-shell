import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact  from "single-spa-react";


const Dashboard = (props: Partial<any>) => {
     const {foo} = props;

  return <div id="dashboard">App {new Date().toLocaleTimeString()} {foo}</div>;
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

console.log("Dashboard loaded", {lifecycles});