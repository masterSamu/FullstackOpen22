import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const dispatch = useDispatch();
  const blogsPerUser = useSelector((state) =>
    state.blogs.reduce((distinctUsers, blog) => {
      const username = blog.user.username;
      if (distinctUsers.length === 0) {
        const object = { username, count: 1 };
        distinctUsers.push(object);
      } else {
        const user = distinctUsers.find((user) => user.username === username);
        console.log(user, username);
        if (user !== undefined) {
          if (user.username === username) {
            user.count = user.count + 1;
            return distinctUsers.filter((u) =>
              u.username !== user.username ? u : user
            );
          }
        } else {
          const object = { username, count: 1 };
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
            <tr key={user.username}>
              <td>{user.username}</td>
              <td> {user.count}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Users;
