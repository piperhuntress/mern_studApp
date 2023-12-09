// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../Config/config";

const UpdateStudent = (props) => {
  const [studId, setstudId] = useState("");
  const [studName, setstudName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dept, setdept] = useState("IT");
  const [responseMsg, setresponseMsg] = useState("");

  const departments = ["IT", "Engineering", "Business", "Foundation"];

  let { Sid } = useParams();

  const updateStudent = async () => {
    try {
      const response = await Axios.put(`${URL}/update/${Sid}`, {
        studId: studId,
        studName: studName,
        email: email,
        password: password,
        dept: dept,
      });
      setresponseMsg(response.data.msg);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Axios.get(`${URL}/getStudent/${Sid}`)
      .then((response) => {
        console.log(response);
        setstudId(response.data.result.studId);
        setstudName(response.data.result.studName);
        setemail(response.data.result.email);
        setpassword(response.data.result.password);
        setdept(response.data.result.dept);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateDept = (e) => {
    setdept(e.target.value);
  };

  return (
    <div className="register-form">
      <table className="table table-striped">
        <tr>
          <td colSpan="2">
            <h1 className="display-6">Update Student</h1>
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
                value={studId}
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
                value={studName}
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
                value={email}
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
                value={password}
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
              <button className="btn btn-info" onClick={updateStudent}>
                Update Student
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>{responseMsg}</div>
    </div>
  );
};

export default UpdateStudent;
