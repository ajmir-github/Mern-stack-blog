import { Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { createPost } from "../../services";

// form for making post
export default function MakePostForm({ postIdRef, setActiveStep, closeModal }) {
  // fontend
  const postSubmisionForm = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const post = {
      title: form.get("title"),
      excerpt: form.get("excerpt"),
      keywords: form.get("keywords"),
      body: form.get("body"),
    };
    createPost(post)
      .then((res) => {
        postIdRef.current = res.data;
        setActiveStep(1);
      })
      .catch((res) => {
        console.warn(res);
      });
  };
  return (
    <Grid
      component={"form"}
      onSubmit={postSubmisionForm}
      container
      flexDirection={"column"}
      gap={1}
      sx={{ mb: 2 }}
    >
      <TextField
        required
        type="text"
        name="title"
        label="Title"
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        type="text"
        name="excerpt"
        label="Excerpt"
        variant="outlined"
        fullWidth
        multiline
        maxRows={2}
      />
      <TextField
        required
        type="text"
        label="Keywords"
        name="keywords"
        variant="outlined"
        fullWidth
        helperText="Seperate the phrases using comma!"
      />
      <TextField
        required
        type="text"
        label="Body"
        name="body"
        variant="outlined"
        fullWidth
        multiline
        maxRows={4}
      />

      <ButtonGroup>
        <Button type="submit" fullWidth variant="outlined">
          Post
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </ButtonGroup>
    </Grid>
  );
}
