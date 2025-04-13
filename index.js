const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const { Student } = require("./models/students.model");
const { Teacher } = require("./models/teachers.model");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/students", async (req, res) => {
  const { name, age, grade, gender } = req.body;

  try {
    const student = new Student({ name, age, grade, gender });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  console.log(studentId);

  try {
    const deleteStudent = await Student.findByIdAndDelete(studentId);

    if (!deleteStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      teacher: deleteStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Teachers CRUD
app.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();

    if (teachers.length > 0) {
      res.status(200).json(teachers);
    } else {
      res.status(404).json({ error: "No Teachers Found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error." });
  }
});

app.post("/teachers", async (req, res) => {
  const { name, age, gender, experience, attendance } = req.body;

  try {
    const teacher = new Teacher({ name, age, gender, experience, attendance });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/teachers/:id", async (req, res) => {
  const teacherId = req.params.id;
  const updatedTeacherData = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updatedTeacherData,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/teachers/:id", async (req, res) => {
  const teacherId = req.params.id;
  console.log(teacherId);

  try {
    const deletedStudent = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
