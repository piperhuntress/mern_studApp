import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { URL } from "../Config/config";

const ManageStudents = () => {
  const [listOfStudents, setlistOfStudents] = useState([]);
  const [countRecords, setcountRecords] = useState(0);
  const [searchKey, setsearchKey] = useState("");

  const deleteStudent = async (id) => {
    try {
      const confirmDelete = window.confirm("Do you really want to delete?");
      if (confirmDelete) {
        const response = await Axios.delete(`${URL}/delete/${id}`);
        setlistOfStudents(
          listOfStudents.filter((val) => {
            return val._id != id;
          })
        );
        //console.log(response);

        setcountRecords(response.data.count);
        alert("Record deleted.");
      }
    } catch (err) {
      console.log("Error");
    }
  };

  const searchStudent = async (e) => {
    setsearchKey(e.target.value);
    //console.log(searchKey);
    try {
      const response = await Axios.get(`${URL}/search/${searchKey}`);
      setlistOfStudents(response.data.result);
      setcountRecords(response.data.count);
      //console.log(response.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Axios.get(`${URL}/manage`)
      .then((response) => {
        setlistOfStudents(response.data.result);
        setcountRecords(response.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="listStudents">
      <h1 className="display-6">Manage Students</h1>
      <input
        type="text"
        placeholder="Search Student by Name..."
        className="searchtxt"
        onChange={(e) => searchStudent(e)}
      ></input>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {listOfStudents.map((students) => (
            <tr key={students._id}>
              <td>{students.studId}</td>
              <td>{students.studName}</td>
              <td>{students.email}</td>
              <td>{students.dept}</td>
              <td>
                <Link to={`/update/${students.studId}`} className="nav-link">
                  <button className="btn btn-info"> Update </button>
                </Link>
              </td>
              <td>
                <button
                  id="removeBtn"
                  className="btn btn-warning"
                  onClick={() => deleteStudent(students._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Number of Records: {countRecords}</h3>
      </div>
    </div>
  );
};

export default ManageStudents;
