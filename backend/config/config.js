module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  JWT_SECRET: process.env.JWT_SECRET || "B*dJ6R;D/Ha)a5D{k@wXjMQ9*R4Gmu",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",

  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://remanrada8:1RIWudunt0PZsMhz@twitter.zc9flxu.mongodb.net/?retryWrites=true&w=majority&appName=Twitter",

  MAX_TWEET_LENGTH: 140,
};
