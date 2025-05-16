const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

console.log("Environment variables:", {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? "URI exists" : "URI missing",
});

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      console.log("Test environment - skipping real DB connection");
      return;
    }

    await mongoose.connect(
      "mongodb+srv://remanrada8:1RIWudunt0PZsMhz@twitter.zc9flxu.mongodb.net/?retryWrites=true&w=majority&appName=Twitter",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Ansluten till MongoDB!");
  } catch (err) {
    console.error("Kunde inte ansluta till MongoDB", err);
    process.exit(1);
  }
};

connectDB();

app.use("/user", userRoutes);
app.use("/api/tweets", tweetRoutes);

app.get("/", (req, res) => {
  res.send("Twitter API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server är igång på port ${PORT}`);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("Server är igång på port ${PORT}");
  });
}

module.exports = app;
