import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ComponentLink from "../../components/ComponentLink";
import GoBack from "../../components/GoBack";
import { getUser, imageURL } from "../../services";
import { viewAction } from "../../state";

function UserCard({ user }) {
  return (
    <>
      <img
        src={
          typeof user.img !== "undefined"
            ? imageURL(user.img, "md")
            : "/assets/unknown_user.jpg"
        }
        width={320}
      />
      <h4>{user.fullName}</h4>
      <h5>{user.title}</h5>
      <div>
        <Link to={"/user/" + user._id}>View</Link>
      </div>
    </>
  );
}

function UserContainer({ users }) {
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}

export default function Users() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    dispatch({ type: viewAction.startLoading });
    getUser()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((res) => {
        console.warn(res);
      })
      .finally(() => {
        dispatch({ type: viewAction.stopLoading });
      });
  }, []);
  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="xl">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item key={user._id} xs={12} md={6} lg={4} xl={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ComponentLink href={"/user/" + user._id}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: "320px",
                    }}
                    image={
                      typeof user.img === "undefined"
                        ? "/assets/unknown_user.jpg"
                        : imageURL(user.img, "md")
                    }
                    alt="random"
                  />
                </ComponentLink>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {user.fullName}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    {user.title}
                  </Typography>
                  <Typography>{user.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <GoBack />
    </>
  );
}
