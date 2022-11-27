import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Modal,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MakePostForm from "./MakePostForm";
import UploadCaptionForm from "./UploadCaptionForm";

const style = {
  position: "absolute",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  p: 4,
};

export default function Feed() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const postIdRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} fullWidth>
        Make a post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted="false"
      >
        <Box sx={style}>
          <Stepper
            activeStep={activeStep}
            alternativeabel
            orientation="vertical"
          >
            <Step key={"Create the content"}>
              <StepLabel>{"Create the content"}</StepLabel>
              <StepContent>
                <MakePostForm
                  setActiveStep={setActiveStep}
                  postIdRef={postIdRef}
                  closeModal={handleClose}
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
                  <Button
                    onClick={() => navigate("/post/" + postIdRef.current)}
                  >
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
    </>
  );
}
