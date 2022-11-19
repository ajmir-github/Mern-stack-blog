import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { imageURL } from "../../services";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileDetails({ user }) {
  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            sx={{ width: 300, height: 300 }}
            src={
              typeof user.img === "undefined"
                ? "/assets/unknown_user.jpg"
                : imageURL(user.img, "md")
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Grid item>
            <Typography variant="h4">Full Name: {user.fullName}</Typography>
            <Typography variant="h6">Title: {user.title}</Typography>
            <Typography variant="subtitle1">Email: {user.email}</Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button endIcon={<EditIcon />}>Edit Profile</Button>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
    </Container>
  );
}
