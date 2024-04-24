import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    loadUser();
    loadPosts();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error(`Error loading user with ID ${id}:`, error);
    }
  };

  const loadPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/posts/${id}`);
      setPosts(response.data);
      setPostCount(response.data.length);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/post/${postId}`);
      loadPosts();
    } catch (error) {
      console.error(`Error deleting post with ID ${postId}:`, error);
    }
  };

  return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
              <h2 className="text-center m-4">Profile</h2>
              {user.id ? (
                  <div className="card">
                    <div className="card-header">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <b>Name :</b> {user.name}
                        </li>
                        <li className="list-group-item">
                          <b>Email :</b> {user.email}
                        </li>
                        <li className="list-group-item">
                          <b>No. of Posts :</b> {postCount}
                        </li>
                      </ul>
                    </div>
                  </div>
              ) : (
                  <p>Loading...</p>
              )}
              <br />
              {user.admin === "Yes" ? (
                  <Link className="btn btn-primary mx-2" to={'/admin'}>
                    Go to Admin Panel
                  </Link>
              ):(<></>)}
              <Link className="btn btn-primary mx-2" to={`/addPost/${id}`}>
                Create Post
              </Link>
              {/* Add a button to navigate to the feed */}
              <Link className="btn btn-primary mx-2" to={`/feed/${id}`}>
                Feed
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="py-4">
            <table className="table border shadow">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Content</th>
                <th scope="col">Options</th>
              </tr>
              </thead>
              <tbody>
              {posts.map((post, index) => (
                  <tr key={post.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{post.content}</td>
                    <td>
                      <button
                          className="btn btn-danger mx-2"
                          onClick={() => deletePost(post.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
