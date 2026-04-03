const User = require("../models/User");

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

    res.json({ success: true });
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