const express = require("express")
const AuthController = require("../controllers/authController")

const router = express.Router()

module.exports = router;

router.post("/registre", AuthController.register)

// router.post("/login/session", AuthController.authsession)

router.post("/login/jwt", AuthController.jwtLogin)

router.post("/logout", AuthController.logout)