import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageURL, updateUser, authToken } from "../services";
import { authAction, viewAction } from "../state";
import SaveIcon from "@mui/icons-material/Done";
import useDebounce from "../hooks/useDebounce";

export default function UpdateProfileInfo({ label, currentValue, field }) {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const [input, onChange] = useDebounce((inputValue) => {
    setSaved(false);
    if (inputValue === "") return setMessage("You must have the box filled!");

    // if the same value entered
    if (inputValue === currentValue)
      return setMessage("You have entered the same value!");

    // update the user
    updateUser({ [field]: inputValue })
      .then((res) => {
        // user updated, start getting the changes
        authToken().then((res) => {
          // apply the changes
          setMessage("");
          dispatch({ type: authAction.updateUser, payload: res.data });
          setSaved(true);
        });
        // end
      })
      .catch(({ response }) => {
        // error hander for updating the user
        setMessage(response.data);
      });
  });

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        error={!!message}
        type="text"
        defaultValue={currentValue || input}
        onChange={onChange}
        id="outlined-basic"
        label={label}
        variant="outlined"
        helperText={message}
        fullWidth
        InputProps={
          saved && {
            endAdornment: (
              <InputAdornment position="end">
                <SaveIcon color="success" />
              </InputAdornment>
            ),
          }
        }
      />
    </Box>
  );
}
