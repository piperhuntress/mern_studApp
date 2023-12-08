import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
  studId: {
    type: String,
    required: true,
  },
  studName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
});

const StudentModel = mongoose.model("studentInfo", StudentSchema);
//module.exports = StudentModel;
export default StudentModel;
