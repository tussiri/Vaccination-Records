import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  immunizationRecords: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ImmunizationRecord" },
  ],
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

// UserSchema.methods.comparePassword = async function (password) {
//   try {
//     const isMatch = await bcrypt.compare(password, this.password);
//     return isMatch;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

UserSchema.methods.comparePassword = async function (password) {
  try {
    console.log("Plain Password:", password);
    console.log("Hashed Password:", this.password);
    const isMatch = await bcrypt.compare(password, this.password);
    console.log("Bcrypt Comparison Result:", isMatch);
    return isMatch;
  } catch (error) {
    console.error("Error during password comparison:", error);
    throw new Error(error);
  }
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: "1h", // or any desired expiration time
  });
  return token;
};

const User = mongoose.model("User", UserSchema);

export default User;
