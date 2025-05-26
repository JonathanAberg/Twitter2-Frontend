const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    originf: "*",
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

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Ansluten till MongoDB!");
  } catch (err) {
    console.error("Kunde inte ansluta till MongoDB", err);
    process.exit(1);
  }
};

connectDB();
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or restrict it to frontend origin
  next();
});

app.get("/", (req, res) => {
  res.send("Twitter API is running");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server är igång på port ${PORT}`);
  });
}

module.exports = app;
