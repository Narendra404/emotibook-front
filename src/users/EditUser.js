import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(user)
      await axios.put(`http://localhost:8080/user/${id}`, user);
      navigate("/admin");
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const goBack = () => {
    // Using the useHistory hook to get access to the history object
    // and go back to the previous page
    window.history.length > 1 && window.history.back();
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Edit User</h2>

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  E-mail
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your e-mail address"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
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
