const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Basic Info
  name: String,
  regNo: String,
  email: String,
  password: String,
  
  // Profile Info
  phone: { type: String, default: null },
  dateOfBirth: { type: String, default: null },
  gender: { type: String, default: null },
  address: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  bloodGroup: { type: String, default: null },
  
  // Academic Info
  semester: { type: Number, default: 1 },
  branch: { type: String, default: "Computer Science & Engineering" },
  batch: { type: String, default: "2021-2025" },
  section: { type: String, default: "A" },
  
  // Academic Performance
  cgpa: { type: Number, default: 0 },
  sgpa: { type: Number, default: 0 },
  
  // Fee Status
  feeStatus: { type: String, default: "Paid" }, // Paid, Pending, Partial
  feeAmount: { type: Number, default: 0 },
  feePaidAmount: { type: Number, default: 0 },
  
  // Attendance (stored as average percentage)
  attendancePercentage: { type: Number, default: 85 },
  
  // Hostel Info
  hostelBlock: { type: String, default: null },
  roomNumber: { type: String, default: null },
  hostelStatus: { type: String, default: "Not Registered" },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);