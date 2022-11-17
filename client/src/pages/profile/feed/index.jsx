import { useRef, useState } from "react";

import MakePostForm from "./MakePostForm";
import UploadCaptionForm from "./UploadCaptionForm";

export default function Feed() {
  const [posted, setPosted] = useState(false);
  const postIdRef = useRef(null);

  return (
    <>
      <h1>Feed</h1>
      {!posted ? (
        <MakePostForm setPosted={setPosted} postIdRef={postIdRef} />
      ) : (
        <UploadCaptionForm setPosted={setPosted} postIdRef={postIdRef} />
      )}
    </>
  );
}
