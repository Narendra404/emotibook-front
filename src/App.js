import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import AddPost from "./posts/AddPost";
import Index from "./pages";
import Login from "./pages/Login";
import Navbar from "./layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import LoginFail from "./users/LoginFail"
import Feed from "./pages/Feed";

function App() {
  return (

      <div className="App">
          <Router>
              <Navbar />
                <Routes>
                    <Route path="/admin" element={<Home />} />
                    <Route path="/adduser" element={<AddUser />} />
                    <Route path="/edituser/:id" element={<EditUser />} />
                    <Route path="/viewuser/:id" element={<ViewUser />} />
                    <Route path="/" element={<Index />} />
                    <Route path="/addPost/:id" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/loginFail" element={<LoginFail />} />
                    <Route path="/dashboard/:id" element={<Dashboard />} />
                    <Route path="/feed/:userId" element={<Feed/>} />
                </Routes>
          </Router>
      </div>

  );
}

export default App;
