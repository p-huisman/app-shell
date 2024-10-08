import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact, {SingleSpaContext} from "single-spa-react";

const Dashboard = (args: any) => {
     const {foo} = args;

  return <div id="dashboard">App {new Date().toLocaleTimeString()} {foo}</div>;
};

export const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Dashboard,
  errorBoundary(err, _info, _props) {
    return <div>Fatal error ${err.message} </div>;
  },
//        
  
}, );

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

console.log("Dashboard loaded", {lifecycles});