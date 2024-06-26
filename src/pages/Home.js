import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const loadPosts = async () => {
    try {
      const result = await axios.get("http://localhost:8080/posts");
      setPosts(result.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      await axios.delete(`http://localhost:8080/postdelete/${id}`);
      await loadUsers();
      await loadPosts();
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center m-4 ">Users</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">User id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.admin}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-center m-4 ">Posts</h2>
        <table className="table border shadow">
          <thead>
          <tr>
            <th scope="col">Post id</th>
            <th scope="col">Content</th>
            <th scope="col">Sentiment</th>
            <th scope="col">Likes</th>
          </tr>
          </thead>
          <tbody>
          {posts.map((post) => (
              <tr key={post.id}>
                <th scope="row">{post.id}</th>
                <td>{post.content}</td>
                <td>{post.sentiment}</td>
                <td>{post.likes}</td>
                <td>
                  {/* <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
