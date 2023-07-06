import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import expressSession from "express-session";

import { MONGODB_URI } from "./config/config.js";

import "./config/passport.js";
import userRoutes from "./routes/userRoutes.js";
import immuzationRecordRoutes from "./routes/immunizationRecordRoutes.js";
import travelVaccineRoutes from "./routes/travelVaccineRoutes.js";

//connect to Mongo
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(
  expressSession({
    secret: "test-test",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.post("/api/debug", (req, res) => {
//   console.log("Debug route called");
//   res.status(200).json({ message: "Debug route called" });
// });

app.use("/api/users", userRoutes);
// app.use("/api/patients", patientRoutes);
app.use("/api/immunizationRecords", immuzationRecordRoutes);
app.use("/api/travelVaccines", travelVaccineRoutes);

app.get("/", (req, res) => {
  res.send("ImmunoGuard App Backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
