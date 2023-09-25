import { Alert } from "@mui/material";

interface NotificationProps {
  message: string | null;
}

const NotificationGreen = (props: NotificationProps) => {
  if (props.message === null) {
    return null;
  }

  return <Alert severity="success">{props.message}</Alert>;
};

const NotificationRed = (props: NotificationProps) => {
  if (props.message === null) {
    return null;
  }

  return <Alert severity="error">{props.message}</Alert>;
};

export { NotificationGreen, NotificationRed };
