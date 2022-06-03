import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
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
    <TableContainer>
    <Table aria-label="user table">
      <TableHead>
        <TableRow>
          <TableCell>username</TableCell>
          <TableCell>blogs created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {blogsPerUser.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </TableCell>
              <TableCell> {user.count}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table></TableContainer>
  );
};

export default Users;
