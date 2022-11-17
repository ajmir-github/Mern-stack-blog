import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../../services";

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
      })
      .catch((res) => {
        console.warn(res);
      });
  }, [id]);

  return <>{loading ? <h1>Loading</h1> : <h1>{user.fullName}</h1>}</>;
}
