const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  semester: Number,
  courseCode: String,
  courseName: String,
  faculty: String,
  conducted: Number,
  attended: Number,
  percentage: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
