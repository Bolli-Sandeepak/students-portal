const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Marks = require("../models/Marks");
const Notification = require("../models/Notification");
const Assignment = require("../models/Assignment");

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, regNo, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = new User({ name, regNo, email, password });
    await user.save();

    res.json({ success: true, message: "Signup successful", user });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { emailOrReg, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrReg }, { regNo: emailOrReg }]
    });

    if (!user || user.password !== password) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Get attendance data for user
exports.getAttendance = async (req, res) => {
  try {
    const userId = req.params.id;
    const attendance = await Attendance.find({ userId });
    
    res.json({ success: true, attendance });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Get marks data for user
exports.getMarks = async (req, res) => {
  try {
    const userId = req.params.id;
    const marks = await Marks.find({ userId }).sort({ semester: 1 });
    
    res.json({ success: true, marks });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Get notifications for user
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    
    res.json({ success: true, notifications });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Mark notification as read
exports.markNotificationRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndUpdate(notificationId, { unread: false }, { new: true });
    
    res.json({ success: true, notification });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Get assignments for user
exports.getAssignments = async (req, res) => {
  try {
    const userId = req.params.id;
    const assignments = await Assignment.find({ userId }).sort({ submittedDate: -1 });
    
    res.json({ success: true, assignments });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};

// Get dashboard data (combined data for dashboard)
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    const attendance = await Attendance.find({ userId, semester: user.semester });
    const marks = await Marks.find({ userId, semester: user.semester });
    const notifications = await Notification.find({ userId, unread: true }).limit(5);
    const assignments = await Assignment.find({ userId }).limit(4);

    res.json({ 
      success: true, 
      user,
      attendance,
      marks,
      notifications,
      assignments
    });
  } catch (err) {
    res.json({ success: false, message: "Server error" });
  }
};