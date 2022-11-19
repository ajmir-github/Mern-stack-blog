import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewAction } from "../state";

export default function AppSnackbar() {
  const state = useSelector((s) => s.view.snackbar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: viewAction.closeSnackbar });
  };

  return (
    <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={state.severity}>{state.message}</Alert>
    </Snackbar>
  );
}
