import "./App.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import StudentRegister from "./Components/StudentRegister";
import ManageStudents from "./Components/ManageStudent";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import UpdateStudent from "./Components/UpdateStudent";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <div className="header">
          <nav className="nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/register" className="nav-link">
              Add New Student{" "}
            </Link>
            <Link to="/manage" className="nav-link">
              Manage Students{" "}
            </Link>
          </nav>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<StudentRegister />}></Route>
            <Route path="/manage" element={<ManageStudents />}></Route>
            <Route path="/update/:Sid" element={<UpdateStudent />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
