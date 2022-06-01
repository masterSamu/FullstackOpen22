import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const blogsPerUser = useSelector((state) =>
    state.blogs.reduce((distinctUsers, blog) => {
      const username = blog.user.username;
      const id = blog.user.id;

      if (distinctUsers.length === 0) {
        const object = { username, id, count: 1 };
        distinctUsers.push(object);
      } else {
        const user = distinctUsers.find((user) => user.username === username);
        if (user) {
          if (user.username === username) {
            user.count = user.count + 1;
            return distinctUsers.filter((u) =>
              u.username !== user.username ? u : user
            );
          }
        } else {
          const object = { username, id, count: 1 };
          distinctUsers.push(object);
        }
      }

      return distinctUsers;
    }, [])
  );

  return (
    <table>
      <thead>
        <tr>
          <th>username</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {blogsPerUser.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td> {user.count}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Users;
