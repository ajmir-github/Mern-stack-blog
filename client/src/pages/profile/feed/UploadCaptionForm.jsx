import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost, uploadImage } from "../../../services";
import { viewAction } from "../../../state";

// form for upload the post caption
export default function UploadCaptionForm({ postIdRef, setPosted }) {
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
      // save the image url in post.img
      await updatePost(postIdRef.current, { img: resA.data });
      setUploading(false);
      setPosted(false);
      dispatch({ type: viewAction.stopLoading });
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
    <form onSubmit={submit}>
      <input type="file" name="file" accept="image/*" ref={inputRef} />
      <button type="submit">Upload</button>
      <div style={{ color: "red" }}>{message}</div>
      {uploading && (
        <div>
          <i>{uploadingProgress}</i>
        </div>
      )}
    </form>
  );
}
