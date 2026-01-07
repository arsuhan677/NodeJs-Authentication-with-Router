const jwt = require("jsonwebtoken");

const { findUserById } = require("../models/userModel");

// session auth

// const sessionAuth = async (req, res, next) => {
//   if (req.session.userId) {
//     req.userId = req.session.userId;
//     next();
//   } else {
//     res.status(401).json({ message: "Unauthorized: No session found" });
//   }
// };

// jwt auth

const jwtAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.startWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorize: No token provide" });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET || "secret_key");

    req.userId = decode.userId;
    req.user = await findUserById(req.userId);

    if (!req.user) {
      return res.status(401).json({ message: "Udauthorize: User not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unothorize: invalid token" });
  }
};

module.exports = {
  jwtAuth,
  // sessionAuth
};
