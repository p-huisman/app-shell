import {registerApplication, start} from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import {AppShellState} from "./helpers/app-shell-state";

function createScriptElement(type: "module" | "importmap"): HTMLScriptElement {
  const script = document.createElement("script");
  script.type = type;
  return script;
}

function createImportMap(state: AppShellState) {
  const imScript = createScriptElement("importmap");
  imScript.textContent = state.importMap;
  document.head.appendChild(imScript);
}

function loadAppShellModule(state: AppShellState) {
  const appShellScript = createScriptElement("module");
  appShellScript.src = state.appShellModule;
  document.head.appendChild(appShellScript);
}

function initSingleSpa(state: AppShellState) {
  const base = document.querySelector("base").href || "/";
  const url = new URL(base);
  const pathName = url.pathname;

  let appTemp = `
    <route default><application name="@app-shell-app/index"></application></route>
    <route path="${pathName}oauth"><application name="@app-shell-app/oauth"></application></route>
    <route path="${pathName}msal"><application name="@app-shell-app/msal"></application></route>`;

  state.apps.forEach((app: any) => {
    appTemp += app.href
      ? `<route path="${pathName}${app.href}"><application name="${app.name}"></application></route>`
      : `<route path="${pathName}${app.name.split("/", 2)[1]}"><application name="${app.name}"></application></route>`;
  });

  const template =
    `<single-spa-router containerEl="#AppArea">${appTemp}</single-spa-router>` as string;
  const routes = constructRoutes(template);

  // window.routes = routes;

  const applications = constructApplications({
    routes,
    loadApp({name}) {
      const importedModule = import(name).catch((e) => {
        state.addMessage(e.message, "error");
      });
      return importedModule;
    },
  });

  const layoutEngine = constructLayoutEngine({routes, applications});

  applications.forEach((app) => {
    if (app.name === "@app-shell-app/index") {
      app.customProps = {appShellState: state};
    }
    const appConfig = state.apps.find((a: any) => a.name === app.name) as any;
    if (appConfig) {
      if (appConfig.initOnStart) {
        const moduleUrl = state.getAppModule(app.name);
        if (moduleUrl) {
          const appPath =
            moduleUrl.pathname.substring(
              0,
              moduleUrl.pathname.lastIndexOf("/") + 1,
            ) + "init.js";
          moduleUrl.pathname = appPath;
          import(moduleUrl.href)
            .then((module) => {
              module.init(app, state);
            })
            .catch((e) => {
              state.addMessage(e.message, "error");
            });
        }
      } else {
        state.addMenuItem(
          appConfig.name,
          appConfig.title,
          appConfig.href,
          appConfig.subItems,
          appConfig.icon,
        );
      }
    }
    app.customProps = {appShellState: state};
  });
  applications.forEach(registerApplication);
  layoutEngine.activate();
  start();
}

async function main() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";

  if (sessionStorage.getItem("redirect")) {
    const location = sessionStorage.getItem("redirect");
    sessionStorage.removeItem("redirect");
    history.replaceState(null, "", location);
  }

  let initDone = false;
  window.addEventListener("appShellStateChange", () => {
    if (!initDone && appShellState.configLoaded) {
      initDone = true;
      createImportMap(appShellState);
      loadAppShellModule(appShellState);
    }
  });
  const appShellState = AppShellState.getInstance("./app-shell.json");

  window.addEventListener(
    "appShellReady",
    () => {
      window.dispatchEvent(
        new CustomEvent("initApps", {detail: appShellState}),
      );
      requestAnimationFrame(() => {
        initSingleSpa(appShellState);
      });
    },
    {once: true},
  );
}

main();
