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

mongoose
  .connect(
    "mongodb+srv://remanrada8:1RIWudunt0PZsMhz@twitter.zc9flxu.mongodb.net/?retryWrites=true&w=majority&appName=Twitter",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Ansluten till MongoDB!"))
  .catch((err) => console.error("Kunde inte ansluta till MongoDB", err));

app.use("/user", userRoutes);
app.use("/api/tweets", tweetRoutes);

app.get("/", (req, res) => {
  res.send("Twitter API is running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server är igång på port ${PORT}`);
});

module.exports = app;
