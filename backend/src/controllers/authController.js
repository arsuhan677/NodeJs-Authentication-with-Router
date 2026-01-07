const { findUserByEmail, creatUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { use } = require("react");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password require" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User already exist!" });
    }

    const user = await creatUser({ email, password });
    if (user) {
      res
        .status(201)
        .json({ success: true, message: "Uder ragisted", data: user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
