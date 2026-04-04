const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  semester: Number,
  courseCode: String,
  courseName: String,
  credits: Number,
  internal: Number,
  external: Number,
  total: Number,
  grade: String,
  gp: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Marks", marksSchema);
