import {registerApplication, start} from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import {AppShellState} from "./helpers/app-shell-state";
import { AuthProvider } from "./helpers/auth-provider";

let deferredPrompt: any;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

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
    <route path="${pathName}oauth"><application name="@app-shell-app/oauth"></application></route>`;

  state.apps.forEach((app: any) => {
    appTemp += app.href
      ? `<route path="${pathName}${app.href}"><application name="${app.name}"></application></route>`
      : `<route path="${pathName}${app.name.split("/", 2)[1]}"><application name="${app.name}"></application></route>`;
  });

  const template =
    `<single-spa-router containerEl="#AppArea">${appTemp}</single-spa-router>` as string;
  const routes = constructRoutes(template);

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

    if (appConfig && appConfig.initOnStart) {
      // If the initOnStart is set to true
      // we load the esm module init.js
      // The init url path is the same as the app path
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
            // Invoke init function on loaded esm module
            // The exported init function is able to add menu items
            module.init(app, state);
          })
          .catch((e) => {
            state.addMessage(e.message, "error");
          });
      }
    } else if (appConfig) {
      // If initOnStart is not set or is set to false
      // we add menu items as configured
      state.addMenuItem(
        appConfig.name,
        appConfig.title,
        appConfig.href,
        appConfig.subItems,
        appConfig.icon,
      );
    }
    app.customProps = {appShellState: state, config: appConfig};
  });
  applications.forEach(registerApplication);
  layoutEngine.activate();
  start();
}

async function main() {

  // handle msal redirect
  if (document.location.hash.indexOf("code=") > -1) {
    await AuthProvider.handlCallback();
  }

  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const base = document.querySelector("base").href || "/"
        const basePath = new URL(base).pathname === "/" ? "" : new URL(base).pathname;
        await navigator.serviceWorker.register(basePath + "service-worker.js", {
          scope: basePath === "" ? undefined : basePath,
        });
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };
  registerServiceWorker();


  if (sessionStorage.getItem("redirect")) {
    const location = sessionStorage.getItem("redirect");
    sessionStorage.removeItem("redirect");
    history.replaceState(null, "", location);
  }

  let initDone = false;
  // Handle appShellStateChange events
  window.addEventListener("appShellStateChange", () => {
    if (!initDone && appShellState.configLoaded) {
      initDone = true;
      createImportMap(appShellState);
      loadAppShellModule(appShellState);
    }
  });
  const appShellState = AppShellState.getInstance(
    "./app-shell.json?" + new Date().getTime(),
  );

  window.addEventListener(
    "appShellReady",
    () => {
      if (deferredPrompt) {
        if (localStorage.getItem("skipInstallApp") !== "true") {
          requestAnimationFrame(() => {
            const actions = [
              {
                id: "no",
                label: "Nee",
              },
              {
                id: "never",
                label: "Nee, nooit",
              },
              {
                id: "yes",
                label: "Ja",
              },
            ];
            appShellState
              .openDialog({
                body: "Wilt u PGGM app-shell installeren?",
                title: "Installeren",
                modal: true,
                theme: appShellState.currentTheme,
                actions,
              })
              .then((actionId) => {
                if (actionId === "yes") {
                  deferredPrompt.prompt();
                } else if (actionId === "never") {
                  localStorage.setItem("skipInstallApp", "true");
                }
              });
          });
        }
      }

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
