import React, {useRef} from "react";
import {
  Button,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
} from "@fluentui/react-components";
import {DismissRegular} from "@fluentui/react-icons";
import {makeStyles} from "@fluentui/react-components";

const useStyles = makeStyles({
  message: {
    marginBottom: "1em",
  },
});

interface ErrorMessageProps {
  intent: "info" | "warning" | "error" | "success";
  id: string;
  body: string | JSX.Element | HTMLElement;
  onClick: () => void;
}

export const AppShellMessage = (props: Partial<ErrorMessageProps>) => {
  const ref = useRef(null);
  const styles = useStyles();
  let jsxElement: JSX.Element;
  if (typeof props.body === "object") {
    if (props.body instanceof HTMLElement) {
      requestAnimationFrame(() => {
        ref.current?.appendChild(props.body);
      });
    } else {
      jsxElement = props.body as JSX.Element;
    }
  }

  return (
    <MessageBar id={"Message" + props.id} intent={props.intent} className={styles.message}>
      <MessageBarBody ref={ref}>
        {typeof props.body === "string" ? props.body : null}
        {jsxElement}
      </MessageBarBody>
      <MessageBarActions
        containerAction={
          <Button
            onClick={props.onClick}
            aria-label="dismiss"
            appearance="transparent"
            icon={<DismissRegular />}
          />
        }
      ></MessageBarActions>
    </MessageBar>
  );
};

export default AppShellMessage;
