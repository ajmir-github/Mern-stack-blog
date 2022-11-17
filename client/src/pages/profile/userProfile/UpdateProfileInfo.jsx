import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageURL, updateUser, authToken } from "../../../services";
import { authAction, viewAction } from "../../../state";

export default function UpdateProfileInfo({ label, currentValue, field }) {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const submitUpdate = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;

    // if empty
    if (inputValue === "") return setMessage("You must have the box filled!");

    // if the same value entered
    if (inputValue === currentValue)
      return setMessage("You have entered the same value!");

    // update the user
    updateUser({ [field]: inputValue })
      .then((res) => {
        // user updated, start getting the changes
        dispatch({ type: viewAction.startLoading });
        authToken().then((res) => {
          // apply the changes
          dispatch({ type: authAction.updateUser, payload: res.data });
          dispatch({ type: viewAction.stopLoading });
        });
        // end
      })
      .catch(({ response }) => {
        // error hander for updating the user
        setMessage(response.data);
        dispatch({ type: viewAction.stopLoading });
      });
  };
  return (
    <form onSubmit={submitUpdate}>
      <label>{label}:</label>
      <input type="text" placeholder={currentValue} ref={inputRef} />
      <input value="Save" type="submit" />
      <div style={{ color: "red" }}>
        <i>{message}</i>
      </div>
    </form>
  );
}
