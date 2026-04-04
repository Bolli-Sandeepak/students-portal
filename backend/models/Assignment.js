const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: String,
  subject: String,
  courseCode: String,
  size: String,
  fileType: String, // pdf, zip, doc, etc.
  submittedDate: { type: Date, default: Date.now },
  dueDate: Date,
  status: { type: String, default: "Submitted" }, // Submitted, Pending, etc.
  marks: { type: Number, default: null },
  feedback: { type: String, default: null }
});

module.exports = mongoose.model("Assignment", assignmentSchema);
