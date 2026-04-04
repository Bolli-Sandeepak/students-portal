const express = require("express");
const router = express.Router();

const { 
  signup, 
  login, 
  getProfile,
  updateProfile,
  getAttendance,
  getMarks,
  getNotifications,
  markNotificationRead,
  getAssignments,
  getDashboardData
} = require("../controllers/authController");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// User routes
router.get("/user/:id/profile", getProfile);
router.put("/user/:id/profile", updateProfile);

// Academic data routes
router.get("/user/:id/attendance", getAttendance);
router.get("/user/:id/marks", getMarks);
router.get("/user/:id/dashboard", getDashboardData);

// Notifications routes
router.get("/user/:id/notifications", getNotifications);
router.put("/notification/:id/read", markNotificationRead);

// Assignments routes
router.get("/user/:id/assignments", getAssignments);

module.exports = router;