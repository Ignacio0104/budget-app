import { Slide } from "@mui/material";

export function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}
