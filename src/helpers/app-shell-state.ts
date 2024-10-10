import type {Theme} from "@fluentui/react-components";
import {IAppShellDialogProps} from "../components/appShellDialog";

type AppShellMessageIntent = "info" | "warning" | "error" | "success";

type JSXElement = JSX.Element;

export interface IAppShellMessage {
  id: string;
  intent: AppShellMessageIntent;
  body: string | HTMLElement | JSX.Element;
}

let appShellStateInstance: AppShellState;
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

  private theme:  "light" | "dark" = "light";

  darkTheme: Theme;

  lightTheme: Theme;

  setTheme(theme: "light" | "dark") {
    this.theme = theme;
    this.dispatchStateChangeEvent();
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
    this.configLoaded = true;
    this.dispatchStateChangeEvent();
  }

  get appShellModule() {
    return this.data.appShell;
  }

  get apps() {
    return this.data.apps;
  }

  get importMap() {
    return JSON.stringify({imports: this.data.imports});
  }

  addMessage(
    body: string | HTMLElement | JSXElement,
    intent: AppShellMessageIntent,
  ) {
    this.messages.push({id: Math.random().toString(), body, intent});
    this.dispatchStateChangeEvent();
  }
  removeMessage(id: string) {
    this.messages = this.messages.filter((message) => message.id !== id);
    this.dispatchStateChangeEvent();
  }
}
