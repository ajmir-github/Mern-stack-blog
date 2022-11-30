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
import UserSearchBar from "../../components/UserSearchBar";
import { getUser, imageURL } from "../../services";
import { viewAction } from "../../state";

export default function Users() {
  const [params, setParams] = useState({});
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    dispatch({ type: viewAction.startLoading });
    getUser(params)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((res) => {
        console.warn(res);
      })
      .finally(() => {
        dispatch({ type: viewAction.stopLoading });
      });
  }, [params]);
  return (
    <>
      <UserSearchBar params={params} setParams={setParams} />
      <Container sx={{ py: 2 }} maxWidth="xl">
        {/* End hero unit */}
        <Grid container rowSpacing={2} columnSpacing={1}>
          {users.map((user) => (
            <Grid item key={user._id} xs={12} sm={6} md={4} lg={3} xl={2}>
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
                      height: "240px",
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
