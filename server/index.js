import express from "express";
import mongoose from "mongoose";
import StudentModel from "./Models/Student.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

//Middleware
/* const corsOptions = {
  //origin: "http://localhost:3000", //client URL local
  //origin: "https://studapp.onrender.com",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}; */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://studapp.onrender.com"); // Replace '*' with the actual origin of your frontend application
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
//app.use(cors(corsOptions));
app.use(express.json());

dotenv.config(); //retrieve the configuration from the  .env file
//const PORT = process.env.PORT;
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_cluster = process.env.DB_CLUSTER;

// connection string
//const connectString = `mongodb+srv://${db_username}:${db_password}@${db_cluster}/${db_name}?retryWrites=true&w=majority`;
const connectString =
  "mongodb+srv://jasminetumulak:admin12345@cluster0.lvic91v.mongodb.net/postITDb?retryWrites=true&w=majority";

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
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

app.get("/test", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("CORS test successful");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("You are connected");
});
