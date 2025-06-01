const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 140,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 140,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hashtags: [String],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    retweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

tweetSchema.index({ hashtags: 1 });

tweetSchema.index({ user: 1 });

tweetSchema.index({ createdAt: -1 });

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
