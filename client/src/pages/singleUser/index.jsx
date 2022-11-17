import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser, imageURL } from "../../services";

export default function SingleUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    getSingleUser(id)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((res) => {
        console.warn(res);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <img
            src={
              typeof user.img === "undefined"
                ? "/assets/unknown_user.jpg"
                : imageURL(user.img, "xs")
            }
          />
          <div>Full Name: {user.fullName}</div>
          <div>title: {user.title}</div>
          <div>Email: {user.email}</div>
          <hr />
        </>
      )}
    </>
  );
}
