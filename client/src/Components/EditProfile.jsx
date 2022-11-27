import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { viewAction, authAction } from "../state";
import {} from "../services";
import { Box, Modal } from "@mui/material";
import UpdateProfileInfo from "./UpdateProfileInfo";

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

export default function EditProfile({ open, setOpen, user }) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <UpdateProfileInfo
          label={"Full Name"}
          currentValue={user.fullName}
          field="fullName"
        />
        <UpdateProfileInfo
          label={"Username"}
          currentValue={user.username}
          field="username"
        />
        <UpdateProfileInfo
          label={"Title"}
          currentValue={user.title}
          field="title"
        />
        <UpdateProfileInfo
          label={"Email"}
          currentValue={user.email}
          field="email"
        />
      </Box>
    </Modal>
  );
}
