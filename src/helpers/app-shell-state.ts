import type {Theme} from "@fluentui/react-components";
import {IAppShellDialogProps} from "../components/appShellDialog";

type AppShellMessageIntent = "info" | "warning" | "error" | "success";

type JSXElement = JSX.Element;

export interface IAppShellMessage {
  id: string;
  intent: AppShellMessageIntent;
  body: string | HTMLElement | JSX.Element;
}

let runningTasks = 0;

let appShellStateInstance: AppShellState;

window.addEventListener("startAppShellTask", () => {
  runningTasks++;
  window.dispatchEvent(
    new CustomEvent("appShellStateChange", {detail: appShellStateInstance}),
  );
});

window.addEventListener("finishAppShellTask", () => {
  runningTasks--;
  window.dispatchEvent(
    new CustomEvent("appShellStateChange", {detail: appShellStateInstance}),
  );
});

export class AppShellState {
  constructor(private configUrl: string) {
    this.loadConfig();
  }

  private dispatchStateChangeEvent() {
    window.dispatchEvent(
      new CustomEvent("appShellStateChange", {detail: this}),
    );
  }

  static getInstance(configUrl: string) {
    if (!appShellStateInstance) {
      appShellStateInstance = new AppShellState(configUrl);
    }
    return appShellStateInstance;
  }

  private data: any;

  private _menu: any[] = [];

  private theme: "light" | "dark" = "light";

  get inProgress(): boolean {
    return runningTasks > 0;
  }

  darkTheme: Theme;

  lightTheme: Theme;

  themeColors: any;

  setTheme(theme: "light" | "dark") {
    this.theme = theme;
    this.dispatchStateChangeEvent();
  }

  getAppModule(name: string): URL {
    this.apps.find((app: any) => app.name === name) as string;
    return new URL(
      this.data.imports[name],
      document.querySelector("base").href,
    );
  }

  get currentTheme(): Theme {
    return this.theme === "dark" ? this.darkTheme : this.lightTheme;
  }

  openDialog: (props: IAppShellDialogProps) => Promise<string>;

  messages: IAppShellMessage[] = [];

  configLoaded = false;

  async loadConfig(): Promise<void> {
    const response = await fetch(this.configUrl);
    this.data = await response.json().catch((e) => e);
    if (this.data instanceof Error || !response.ok) {
      this.messages.push(this.data.message);
      return Promise.reject(this.data);
    }

    this.themeColors = this.data.theme.colors;

    this.data.apps.forEach((app: any) => {
      this._menu.push({app});
    });
    this.configLoaded = true;
    this.dispatchStateChangeEvent();
  }

  get appShellModule() {
    return this.data.appShell;
  }

  get apps() {
    return this.data.apps;
  }

  addMenuItem(
    appName: string,
    title: string,
    href: string,
    subItems?: [],
    icon?: string,
  ) {
    const appMenu = this._menu.find((a: any) => a.app.name === appName);
    const app = this.apps.find((a: any) => a.name === appName);

    if (appMenu) {
      if (app.initOnStart) {
        href = document.querySelector("base").href + appName.split("/", 2)[1];
      }
      appMenu.menu = {name: appName, title, href, subItems, icon};
      this.dispatchStateChangeEvent();
    }
  }

  get menu() {
    const items: any = [];
    this._menu.forEach((data) => {
      items.push(data.menu);
    });
    return items;
  }

  get importMap() {
    return JSON.stringify({imports: this.data.imports});
  }

  addMessage(
    body: string | HTMLElement | JSXElement,
    intent: AppShellMessageIntent,
  ) {
    const id = Math.random().toString(36).substring(7);
    this.messages.push({id, body, intent});
    this.dispatchStateChangeEvent();
    requestAnimationFrame(() => {
      document
        .querySelector("#Message" + id)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
    });
    return id;
  }

  removeMessage(id: string) {
    this.messages = this.messages.filter((message) => message.id !== id);
    this.dispatchStateChangeEvent();
  }
}
