import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { viewAction, authAction } from "../state";
import { authToken, uploadImage, updateUser, deleteImage } from "../services";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  LinearProgress,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/UploadFile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
};

export default function UploadProfile({ open, setOpen, user }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const inputObserver = async (e) => {
    if (e.target.files.length === 0) return;
    try {
      const previousImg = user.img;
      const form = new FormData();
      form.append("file", e.target.files[0]);
      // upload the image
      setUploading(true);
      const resA = await uploadImage(form, setProgress);
      setUploading(false);
      setOpen(false);
      // save the image url in user.img
      dispatch({ type: viewAction.startLoading });
      await updateUser({ img: resA.data });
      dispatch({
        type: viewAction.openSnackbar,
        payload: {
          message: "Your profile has changed!",
        },
      });

      // reload the user in auth.user
      const resC = await authToken();
      dispatch({ type: authAction.updateUser, payload: resC.data });
      dispatch({ type: viewAction.stopLoading });
      // delete the current image
      await deleteImage(previousImg);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {!uploading ? (
          <Button startIcon={<UploadIcon />} component="label" fullWidth>
            Choose an image
            <input
              hidden
              name="file"
              accept="image/*"
              type="file"
              onChange={inputObserver}
            />
          </Button>
        ) : (
          <Grid container justifyContent="center">
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress variant="determinate" value={progress} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                >
                  {`${Math.round(progress)}%`}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Box>
    </Modal>
  );
}
