import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { viewAction, authAction } from "../../../state";
import {
  authToken,
  uploadImage,
  updateUser,
  deleteImage,
} from "../../../services";

export default function UpdateProfileImage({ currentImg }) {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const upload = async (formData) => {
    try {
      // upload the image
      setUploading(true);
      const resA = await uploadImage(formData, setUploadingProgress);
      setUploading(false);

      // save the image url in user.img
      dispatch({ type: viewAction.startLoading });
      await updateUser({ img: resA.data });
      // reload the user in auth.user
      const resC = await authToken();
      dispatch({ type: authAction.updateUser, payload: resC.data });

      dispatch({ type: viewAction.stopLoading });

      // delete the current image
      const res = await deleteImage(currentImg);
    } catch (error) {
      console.warn(error);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const files = inputRef.current.files;
    if (files.length === 0) return setMessage("Please select an image!");
    upload(e.target);
  };
  return (
    <form onSubmit={submit} encType="multipart/form-data">
      <input type="file" name="file" accept="image/*" ref={inputRef} />
      <input type="submit" value="Upload"></input>
      <div style={{ color: "red" }}>
        <i>{message}</i>
      </div>
      {uploading && (
        <div>
          <i>{uploadingProgress}</i>
        </div>
      )}
    </form>
  );
}
