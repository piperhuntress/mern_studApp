import express from "express";
import mongoose from "mongoose";
import StudentModel from "./Models/Student.js";
import cors from "cors";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Database connection
const connectString =
  "mongodb+srv://admin:admin12345@clusterstudapp.w5mibfb.mongodb.net/studentDb?retryWrites=true&w=majority";
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/********************************************************/
//express POST route for adding new student
app.post("/addStudent", async (req, res) => {
  const studId = req.body.studId;
  const studName = req.body.studName;
  const email = req.body.email;
  const password = req.body.password;
  const dept = req.body.dept;

  try {
    const student = new StudentModel({
      studId: studId,
      studName: studName,
      email: email,
      password: password,
      dept: dept,
    });
    await student.save();
    res.send({ msg: "Record successfully added." });
  } catch (err) {
    res.send({ msg: err });
  }
});
/********************************************************/
//express GET route for retrieving records from the database
app.get("/manage", async (req, res) => {
  try {
    const result = await StudentModel.find({});
    const countStudent = await StudentModel.countDocuments({});
    res.send({ result, count: countStudent });
  } catch (err) {
    res.send({ msg: "Error" });
  }
});

app.get("/getStudent/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await StudentModel.findOne({ studId: id });
    //if student is not found
    if (!result) {
      return res.status(404).send({ msg: "Student not found" });
    }
    const countStudent = await StudentModel.countDocuments({});
    console.log(result);
    res.send({ result, count: countStudent });
  } catch (err) {
    res.send({ msg: "Error" });
  }
});
/********************************************************/
//express GET route for searching records from the database
app.get("/search/:searchkey", async (req, res) => {
  const search = req.params.searchkey.trim();
  // console.log(search);
  var query = {
    studName: { $regex: "^" + search, $options: "i" },
  };
  if (search != null) {
    try {
      const result = await StudentModel.find(query);
      const countStudent = await StudentModel.countDocuments({
        query,
      });
      res.send({ result, count: countStudent });
    } catch (err) {
      res.send({ msg: "Error" });
    }
  } else {
    try {
      const result = StudentModel.find({});
      const countStudent = await StudentModel.countDocuments({});
      res.send({ result, count: countStudent });
    } catch (err) {
      res.send({ msg: "Error" });
    }
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await StudentModel.findOneAndDelete({ _id: id });
    if (!result) {
      return res.status(404).send({ msg: "Student not found" });
    }
    const countStudent = await StudentModel.countDocuments({});
    res.send({ msg: "Student Deleted", count: countStudent });
  } catch (err) {
    res.send({ msg: "Error" });
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req);
  const studId = req.body.studId;
  const studName = req.body.studName;
  const email = req.body.email;
  const password = req.body.password;
  const dept = req.body.dept;
  console.log(studId);
  try {
    const studentToUpdate = await StudentModel.findOne({ studId: id });
    console.log(studentToUpdate);
    //if student is not found
    if (!studentToUpdate) {
      return res.status(404).send({ msg: "Student not found" });
    }
    studentToUpdate.studId = String(studId);
    studentToUpdate.studName = String(studName);
    studentToUpdate.email = String(email);
    studentToUpdate.password = String(password);
    studentToUpdate.dept = String(dept);

    studentToUpdate.save();
    res.send({ msg: "Record Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Error updating record" });
  }
});

app.listen(3001, () => {
  console.log("You are connected");
});
