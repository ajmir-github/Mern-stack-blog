import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser, imageURL } from "../../services";

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
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser()
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((res) => {
        console.warn(res);
      });
  }, []);
  return <>{loading ? <h1>Users</h1> : <UserContainer users={users} />}</>;
}
