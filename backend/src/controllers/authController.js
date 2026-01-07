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

// jwt

const jwtLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await findUserByEmail(email)
        console.log("login user", user)
        if (user &&(await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user.id},process.env.JWT_SECRET || "secret_key" ,{expiresIn: "1h"})
            res.json({ success: true, message: "Looged in via JWT", token, user: {id: user.id, email: user.email}})
            
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials"})
        }
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    res.json({message: "Looged out"})
}

module.exports = {
    register,
    jwtLogin,
    // sessionLogin
    logout
}
