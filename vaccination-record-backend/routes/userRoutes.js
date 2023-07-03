import express from "express";
import User from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";
import bcrypt from "bcryptjs";
import ImmunizationRecord from "../models/ImmunizationRecord.js";

const router = express.Router();

// GET all users
router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET user by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST register new user
router.post("/register", async (req, res) => {
  const { firstName, lastName, birthDate, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Include the user object in the response
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Request body: ", req.body);
  console.log("Provided password: ", password);
  try {
    const user = await User.findOne({ email });
    console.log("Stored pasword: ", user.password);
    console.log("User:", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await user.comparePassword(password, user.password);
    console.log("isPasswordValid:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.generateAuthToken();
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    res.json({ user: user.toAuthJSON(), token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Logging in" });
  }
});

// PUT update user by ID
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { firstName, lastName, birthDate, email, password } = req.body;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.birthDate = birthDate || user.birthDate;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    res.json({ message: "User updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.get("/:id/immunizationRecords", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "immunizationRecords"
    );
    if (!user) {
      return res.status(404).json({ messate: "User not found" });
    }
    res.json(user.immunizationRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
