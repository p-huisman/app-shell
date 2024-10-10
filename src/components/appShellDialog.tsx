import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  FluentProvider,
  type Theme,
} from "@fluentui/react-components";

import {createRoot} from "react-dom/client";

export interface IAppShellDialogProps {
  theme: Theme;
  title: string | HTMLElement | JSX.Element;
  body: string | HTMLElement | JSX.Element;
  modal?: boolean;
  onClose?: (actionId?: string) => void;
  actions?: IAppShellDialogAction[];
}

export interface IAppShellDialogAction {
  id: string;
  label: string;
}

export const openDialog = (props: IAppShellDialogProps): Promise<string> => {
  // dialog container
  const newElement = document.createElement("div");
  newElement.classList.add("dialog-container");
  document.querySelector("#Content").appendChild(newElement);
  const root = createRoot(newElement);
  const dialogGuid = Math.random().toString(36).substring(7);

  let title: any = null;
  let body: any = null;

  if (typeof props.body === "string") {
    body = props.body;
  } else if (typeof props.body === "object") {
    if (props.body instanceof HTMLElement) {
      requestAnimationFrame(() => {
        document.body
          .querySelector(`.dialog-body[data-dialog-guid="${dialogGuid}"]`)
          ?.appendChild(props.body as HTMLElement);
      });
    } else {
      body = props.body;
    }
  }

  if (typeof props.title === "string") {
    title = props.title;
  } else if (typeof props.title === "object") {
    if (props.title instanceof HTMLElement) {
      requestAnimationFrame(() => {
        document.body
          .querySelector(`.dialog-title[data-dialog-guid="${dialogGuid}"]`)
          ?.appendChild(props.title as HTMLElement);
      });
    } else {
      title = props.title;
    }
  }

  let actionResult: string;

  return new Promise((resolve, reject) => {
    const dlg = () => (
      <FluentProvider theme={props.theme}>
        <Dialog
          defaultOpen
          modalType={props.modal ? "modal" : "non-modal"}
          onOpenChange={() => {
            resolve(actionResult);
            newElement.remove();
          }}
        >
          <DialogSurface>
            <DialogBody>
              <DialogTitle
                className="dialog-title"
                data-dialog-guid={dialogGuid}
              >
                {title ? title : null}
              </DialogTitle>
              <DialogContent
                className="dialog-body"
                data-dialog-guid={dialogGuid}
              >
                {body ? body : null}
              </DialogContent>
              <DialogActions>
                {props.actions.map(
                  (action: IAppShellDialogAction, index: number) => {
                    return (
                      <DialogTrigger disableButtonEnhancement key={index}>
                        <Button
                          appearance={
                            index === props.actions.length - 1
                              ? "primary"
                              : "secondary"
                          }
                          onClick={() => {
                            actionResult = action.id;
                          }}
                        >
                          {action.label}
                        </Button>
                      </DialogTrigger>
                    );
                  },
                )}
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </FluentProvider>
    );
    root.render(dlg());
  });
};
