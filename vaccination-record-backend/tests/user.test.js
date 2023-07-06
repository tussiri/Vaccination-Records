import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import app from "../server.js";
import User from "../models/User.js";

let mongoServer;

beforeEach(async () => {
  await User.deleteMany({});
});

beforeAll(async () => {
  process.env.JWT_SECRET = "test-test";
  mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("User model", () => {
  it("should hash the password before saving", async () => {
    const user = new User({
      firstName: "Thomas",
      lastName: "Tank",
      birthDate: "1990-01-01",
      email: "thomas.tank@example.com",
      password: "password",
    });
    await user.save();

    const savedUser = await User.findById(user.id);
    const isPasswordMatch = await bcrypt.compare(
      "password",
      savedUser.password
    );

    expect(isPasswordMatch).toBe(true);
  });
  it("should validate the password correctly", async () => {
    const user = new User({
      firstName: "Thomas",
      lastName: "Tank",
      birthDate: "1990-01-01",
      email: "thomas.tank@example.com",
      password: "password",
    });
    await user.save();
    const isPasswordValid = await user.comparePassword("password");
    const isPasswordInvalid = await user.comparePassword("wrongpassword");
    expect(isPasswordValid).toBe(true);
    expect(isPasswordInvalid).toBe(false);
  });
  it("should generate a valid auth token", async () => {
    const user = new User({
      firstName: "Thomas",
      lastName: "Tank",
      birthDate: "1990-01-01",
      email: "thomas.tank@example.com",
      password: "password",
    });
    await user.save();

    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded.id).toBe(user.id);
  });
});
