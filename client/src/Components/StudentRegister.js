// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Axios from "axios";
import { useState, useEffect } from "react";
import { URL } from "../Config/config";

const StudentRegister = () => {
  const [studId, setstudId] = useState("");
  const [studName, setstudName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dept, setdept] = useState("IT");
  const [responseMsg, setresponseMsg] = useState("");

  const departments = ["IT", "Engineering", "Business", "Foundation"];

  const addStudent = async () => {
    try {
      if (!studId || !studName || !email || !password || !dept) {
        alert("All fields are required.");
      } else {
        const response = await Axios.post(`${URL}/addStudent`, {
          studId: studId,
          studName: studName,
          email: email,
          password: password,
          dept: dept,
        });
        // Handle successful response
        setresponseMsg(response.data.msg);
        console.log(response);
      }
    } catch (err) {
      // Handle errors
      console.error(err);
    }
  };

  const updateDept = (e) => {
    //console.log(dept);
    setdept(e.target.value);
  };

  return (
    <div className="register-form">
      <table className="table table-striped">
        <tr>
          <td colSpan="2">
            <h1 className="display-6">Student Registration</h1>
          </td>
        </tr>
        <tbody>
          <tr>
            <td>Student ID</td>
            <td>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setstudId(e.target.value);
                }}
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td>Student Name</td>
            <td>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setstudName(e.target.value);
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                className="form-control"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Department</td>
            <td>
              <select
                onChange={(e) => {
                  updateDept(e);
                }}
              >
                {departments.map((value, key) => {
                  return (
                    <option value={value} key={key}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td colSpan="2">
              <button className="btn btn-info" onClick={addStudent}>
                Add Student
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>{responseMsg}</div>
    </div>
  );
};

export default StudentRegister;
