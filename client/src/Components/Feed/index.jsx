import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Modal,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MakePostForm from "./MakePostForm";
import UploadCaptionForm from "./UploadCaptionForm";

const style = {
  position: "absolute",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  p: 4,
};

export default function Feed({ open, setOpen }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const postIdRef = useRef(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step key={"Create the content"}>
            <Grid container justifyContent="right">
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <StepLabel>{"Create the content"}</StepLabel>
            <StepContent>
              <MakePostForm
                setActiveStep={setActiveStep}
                postIdRef={postIdRef}
              />
            </StepContent>
          </Step>
          <Step key={"upload a caption image"}>
            <StepLabel>{"upload a caption image"}</StepLabel>
            <StepContent>
              <UploadCaptionForm
                setActiveStep={setActiveStep}
                postIdRef={postIdRef}
              />
            </StepContent>
          </Step>
          <Step key={"Completed"}>
            <StepLabel>{"Completed"}</StepLabel>
            <StepContent>
              <ButtonGroup fullWidth>
                <Button onClick={() => navigate("/post/" + postIdRef.current)}>
                  View the post
                </Button>
                <Button onClick={() => setActiveStep(0)}>
                  Make another post
                </Button>
                <Button onClick={handleClose}>Exit</Button>
              </ButtonGroup>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </Modal>
  );
}
