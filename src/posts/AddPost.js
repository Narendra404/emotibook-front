import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddPost() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [post, setPost] = useState({
    content: "",
    likes: 0,
    user: { id: parseInt(id) }, // Set the userId directly in the post object
  });

  const { content } = post;

  const onInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/post", post);

      if (response.data) {
        navigate(`/dashboard/${id}`);
      }
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  const goBack = () => {
    window.history.length > 1 && window.history.back();
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Create a Post</h2>

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="Post" className="form-label">
                  Post Content
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type something ..."
                    name="content"
                    value={content}
                    onChange={onInputChange}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Create post
              </button>
              <Link className="btn btn-outline-danger mx-2" to="#" onClick={goBack}>
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
  );
}
