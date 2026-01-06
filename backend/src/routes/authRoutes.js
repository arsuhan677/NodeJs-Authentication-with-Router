const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

// Registration (Common)
router.post("/register", AuthController.register);

// Session Login
router.post("/login/session", AuthController.sessionLogin);

// JWT Login
// router.post("/login/jwt", AuthController.jwtLogin);

// Logout
router.post("/logout", AuthController.logout);

module.exports = router;