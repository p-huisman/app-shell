import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import * as msal from "@azure/msal-browser";

const pca = msal
  .createStandardPublicClientApplication({
    auth: {
      clientId: "6e33a9dd-56c2-4ce7-a374-95d8f51bccd4",
      authority:
        "https://login.microsoftonline.com/9e3ee5fe-3a99-45db-ac6e-691e86febef3",
    },
  })
  .then((client) => {
    client
      .loginRedirect()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

const Msal = () => {
  return <div id="msal">Even geduld a.u.b. ...</div>;
};

export const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Msal,
  errorBoundary(err) {
    return <div>Fatal error ${err.message} </div>;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
