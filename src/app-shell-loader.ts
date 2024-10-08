import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

async function loadAppShellConfig() {
  return await fetch("./app-shell.json")
    .then((response) => response.json())
    .catch((e) => e);
}

function createScriptElement(type: "module" | "importmap"): HTMLScriptElement {
  const script = document.createElement("script");
  script.type = type;
  return script;
}

function createImportMap(config: any) {
  const imScript = createScriptElement("importmap");
  imScript.textContent = JSON.stringify({
    imports: config.imports,
  });
  document.head.appendChild(imScript);
}

function loadAppShell(config: any) {
  const appShellScript = createScriptElement("module");
  appShellScript.src = config.appShell;
  document.head.appendChild(appShellScript);
}

function initSingleSpa(config: any) {
  let appTemp =
    '<route default><application name="@app-shell-app/index"></application></route>';

  config.apps.forEach((app: any) => {
    appTemp += `<route path="${app.href}"><application name="${app.name}"></application></route>`;
  });

  const template =
    `<single-spa-router containerEl="#Content">${appTemp}</single-spa-router>` as string;
  const routes = constructRoutes(template);

  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return import(name);
    },
  });

  const layoutEngine = constructLayoutEngine({ routes, applications });

  applications.forEach((app) => {
    app.customProps = { foo: "bar" };
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
  const config = await loadAppShellConfig();

  window.addEventListener(
    "appShellReady",
    () => {
      window.dispatchEvent(
        new CustomEvent("initApps", { detail: config.apps })
      );
      requestAnimationFrame(() => {
        initSingleSpa(config);
      });
    },
    { once: true }
  );

  createImportMap(config);
  //   initSingleSpa(config);
  loadAppShell(config);
}

main();
