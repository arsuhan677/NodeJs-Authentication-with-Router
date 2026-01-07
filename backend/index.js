require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const sqliteStore = require("connect-sqlite3")(session);
const path = require("path");

const authRoutes = require("./src/routes/authRoutes");
const noteRoutes = require("./src/routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Session Configuration
app.use(session({
  store: new sqliteStore({
    db: "sessions.db",
    dir: path.join(__dirname, "src/database")
  }),
  secret: process.env.SESSION_SECRET || "session_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  }
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Auth Demo API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// mongoose
//   .connect(
//     "mongodb+srv://user_name:DVBIk2bDqjLxJAa0@cluster0.ejhxfaz.mongodb.net/?appName=Cluster0"
//   )
//   .then(() => {
//     app.listen(port, (req, res) => {
//       console.log(`application is runnig on the port ${port}`);
//     });
//     console.log("mongodb is connected");
//   })
//   .catch(() => {
//     console.log("mongodb is connected failed");
//   });