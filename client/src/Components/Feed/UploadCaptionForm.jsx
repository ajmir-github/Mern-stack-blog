import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import UploadIcon from "@mui/icons-material/UploadFile";
import { viewAction, authAction } from "../../state";
import { authToken, uploadImage, updatePost } from "../../services";

// form for upload the post caption
export default function UploadCaptionForm({ postIdRef, setActiveStep }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const inputObserver = async (e) => {
    if (e.target.files.length === 0) return;
    try {
      const form = new FormData();
      form.append("file", e.target.files[0]);
      // upload the image
      setUploading(true);
      const resA = await uploadImage(form, setProgress);
      // save the image url in post.img
      await updatePost(postIdRef.current, { img: resA.data });
      setUploading(false);
      // save the image url in user.img
      dispatch({ type: viewAction.startLoading });
      dispatch({
        type: viewAction.openSnackbar,
        payload: {
          message: "Your profile has changed!",
        },
      });

      // reload the user in auth.user
      dispatch({ type: viewAction.stopLoading });
      setActiveStep(2);
      // delete the current image
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Grid container flexDirection={"column"} gap={1} sx={{ mb: 2 }}>
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
    </Grid>
  );
}
