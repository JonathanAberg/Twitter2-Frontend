const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../../server");
const User = require("../../models/userModel");
const Tweet = require("../../models/tweetModel");
const { connectDB, clearDatabase, closeDatabase } = require("../utils/db");

describe("Tweet API Routes", () => {
  let testUser;
  let token;

  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    testUser = await User.create({
      name: "Tweet Test User",
      email: "tweettest@example.com",
      password: "password123",
    });

    token = jwt.sign(
      { id: testUser._id },
      process.env.JWT_SECRET || "testjwtsecret",
      { expiresIn: "1h" }
    );
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe("POST /api/tweets", () => {
    it("ska skapa en ny tweet", async () => {
      const tweetData = {
        content: "Detta är en testtweet #test",
      };

      const res = await request(app)
        .post("/api/tweets")
        .set("Authorization", `Bearer ${token}`)
        .send(tweetData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.content).toBe(tweetData.content);
      expect(res.body.user).toBeDefined();
      expect(res.body.hashtags).toContain("test");
    });

    it("ska neka tweet utan content", async () => {
      const res = await request(app)
        .post("/api/tweets")
        .set("Authorization", `Bearer ${token}`)
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("ska neka tweet längre än 140 tecken", async () => {
      const longContent = "a".repeat(141);

      const res = await request(app)
        .post("/api/tweets")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: longContent });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toContain("140");
    });
  });

  describe("GET /api/tweets", () => {
    it("ska hämta tweets från följda användare", async () => {
      const user2 = await User.create({
        name: "Second User",
        email: "second@example.com",
        password: "password123",
      });

      testUser.following.push(user2._id);
      await testUser.save();

      await Tweet.create({
        content: "Tweet från testUser",
        user: testUser._id,
      });

      await Tweet.create({
        content: "Tweet från user2",
        user: user2._id,
      });

      const user3 = await User.create({
        name: "Third User",
        email: "third@example.com",
        password: "password123",
      });

      await Tweet.create({
        content: "Tweet från user3",
        user: user3._id,
      });

      const res = await request(app)
        .get("/api/tweets")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);

      const tweetContents = res.body.map((tweet) => tweet.content);
      expect(tweetContents).toContain("Tweet från testUser");
      expect(tweetContents).toContain("Tweet från user2");
      expect(tweetContents).not.toContain("Tweet från user 3");
    });
  });

  describe("GET /api/tweets/user/:userId", () => {
    it("ska hämta tweets från en specifik användare", async () => {
      await Tweet.create([
        {
          content: "Tweet 1 från testUser",
          user: testUser._id,
        },
        {
          content: "Tweet 2 från testUser",
          user: testUser._id,
        },
      ]);

      const otherUser = await User.create({
        name: "Other User",
        email: "other@example.com",
        password: "password123",
      });

      await Tweet.create({
        content: "Tweet från otherUser",
        user: otherUser._id,
      });

      const res = await request(app).get(`/api/tweets/user/${testUser._id}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);

      res.body.forEach((tweet) => {
        expect(tweet.user._id).toBe(testUser._id.toString());
      });
    });
  });

  describe("GET /api/tweets/hashtag/:tag", () => {
    it("ska hämta tweets med en specifik hashtag", async () => {
      await Tweet.create([
        {
          content: "Tweet med #test hashtag",
          user: testUser._id,
          hashtags: ["test"],
        },
        {
          content: "Annan tweet med #javascript",
          user: testUser._id,
          hashtags: ["javascript"],
        },
        {
          content: "Tweet med både #test och #javascript",
          user: testUser._id,
          hashtags: ["test", "javascript"],
        },
      ]);

      const res = await request(app).get("/api/tweets/hashtag/test");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);

      res.body.forEach((tweet) => {
        expect(tweet.hashtags).toContain("test");
      });
    });
  });

  describe("Tweet like/unlike", () => {
    let testTweet;

    beforeEach(async () => {
      testTweet = await Tweet.create({
        content: "Tweet för like-test",
        user: testUser._id,
        hashtags: [],
      });
    });

    it("ska tillåta en användare att gilla en tweet", async () => {
      const res = await request(app)
        .post(`/api/tweets/${testTweet._id}/like`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const updatedTweet = await Tweet.findById(testTweet._id);
      expect(updatedTweet.likes).toContainEqual(testUser._id);
    });

    it("ska tillåta en användare att ta bort sin like", async () => {
      testTweet.likes.push(testUser._id);
      await testTweet.save();

      const res = await request(app)
        .post(`/api/tweets/${testTweet._id}/unlike`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const updatedTweet = await Tweet.findById(testTweet._id);
      expect(updatedTweet.likes).not.toContainEqual(testUser._id);
    });
  });
});
