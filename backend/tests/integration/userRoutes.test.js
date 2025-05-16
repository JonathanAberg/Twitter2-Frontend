const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = require("../../server");
const User = require("../../models/userModel");
const { connectDB, clearDatabase, closeDatabase } = require("../utils/db");

const testUser = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
  nickname: "testuser",
};

describe("User API Routes", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe("POST /user", () => {
    it("ska registrera en ny användare och returnera token", async () => {
      const res = await request(app).post("/user").send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("_id");
      expect(res.body.name).toBe(testUser.name);
      expect(res.body.email).toBe(testUser.email);
    });

    it("ska inte tillåta registrering med befintlig email", async () => {
      await User.create(testUser);

      const res = await request(app).post("/user").send(testUser);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toContain("finns redan");
    });
  });

  describe("POST /user/login", () => {
    it("ska logga in användare med korrekta uppgifter", async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testUser.password, salt);

      await User.create({
        ...testUser,
        password: hashedPassword,
      });

      const res = await request(app).post("/user/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.name).toBe(testUser.name);
      expect(res.body.email).toBe(testUser.email);
    });

    it("ska neka inloggning med fel lösenord", async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testUser.password, salt);

      await User.create({
        ...testUser,
        password: hashedPassword,
      });

      const res = await request(app).post("/user/login").send({
        email: testUser.email,
        password: "whrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("GET /user/:id", () => {
    it("ska hämta användarprofil med giltigt ID", async () => {
      const user = await User.create(testUser);

      const res = await request(app).get(`/user/${user._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.name).toBe(testUser.name);
      expect(res.body.email).toBe(testUser.email);
      expect(res.body).not.toHaveProperty("password");
    });

    it("ska returnera 404 för ogiltigt ID", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/user/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("User follow/unfollow", () => {
    it("ska tillåta en användare att följa en annan", async () => {
      const user1 = await User.create({
        name: "User One",
        email: "user1@example.com",
        password: "password123",
      });

      const user2 = await User.create({
        name: "User Two",
        email: "user2@example.com",
        password: "password123",
      });

      const token = jwt.sign(
        { id: user1._id },
        process.env.JWT_SECRET || "testjwtsecret",
        { expiresIn: "1h" }
      );

      const res = await request(app)
        .post(`/user/${user2._id}/follow`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const updatedUser1 = await User.findById(user1._id);
      const updatedUser2 = await User.findById(user2._id);

      expect(updatedUser1.following).toContainEqual(user2._id);
      expect(updatedUser2.following).toContainEqual(user1._id);
    });

    it("ska tillåta en användare att avfölja en annan", async () => {
      const user1 = await User.create({
        name: "User One",
        email: "user1@example.com",
        password: "password123",
        following: [],
      });

      const user2 = await User.create({
        name: "User Two",
        email: "user2@example.com",
        password: "password123",
        followers: [],
      });

      user1.following.push(user2._id);
      user2.following.push(user1._id);
      await user1.save();
      await user2.save();

      const token = jwt.sign(
        { id: user1._id },
        process.env.JWT_SECRET || "testjwtsecret",
        { expiresIn: "1h" }
      );

      const res = await request(app)
        .post(`/user/${user2._id}/unfollow`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const updatedUser1 = await User.findById(user1._id);
      const updatedUser2 = await User.findById(user2._id);

      expect(updatedUser1.following).not.toContainEqual(user2._id);
      expect(updatedUser2.following).not.toContainEqual(user1._id);
    });
  });
});
