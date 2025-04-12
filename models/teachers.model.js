const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  experience: String,
  attendance: Number,
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = { Teacher };
