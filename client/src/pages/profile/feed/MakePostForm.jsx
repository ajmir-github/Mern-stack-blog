import { useRef } from "react";
import { createPost } from "../../../services";

// form for making post
export default function MakePostForm({ postIdRef, setPosted }) {
  const titleRef = useRef(null);
  const excerptRef = useRef(null);
  const keywordsRef = useRef(null);
  const bodyRef = useRef(null);
  // fontend
  const postSubmisionForm = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const excerpt = excerptRef.current.value;
    const keywords = keywordsRef.current.value;
    const body = bodyRef.current.value;
    const post = {
      title,
      excerpt,
      keywords,
      body,
    };
    createPost(post)
      .then((res) => {
        postIdRef.current = res.data;
        setPosted(true);
      })
      .catch((res) => {
        console.warn(res);
      });
  };
  return (
    <form onSubmit={postSubmisionForm}>
      title:
      <input required type="text" ref={titleRef} defaultValue="Total here!" />
      <br />
      excerpt:
      <input
        required
        type="text"
        ref={excerptRef}
        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing"
      />
      <br />
      keywords:
      <input
        required
        type="text"
        ref={keywordsRef}
        defaultValue="Computer, games"
      />
      <br />
      body:
      <textarea
        required
        rows="6"
        cols="40"
        ref={bodyRef}
        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, impedit
          hic? Vel sunt hic, laborum, ipsa facilis delectus labore veniam
          distinctio dolores doloribus quos ad magnam. Necessitatibus hic atque
          deleniti."
      />
      <button type="submit">Post</button>
    </form>
  );
}
