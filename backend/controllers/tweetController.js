const Tweet = require("../models/tweetModel");
const User = require("../models/userModel");

const extractHashtags = (content) => {
  const hashtagRegex = /#(\w+)/g;
  const hashtags = [];
  let match;

  while ((match = hashtagRegex.exec(content)) !== null) {
    hashtags.push(match[1].toLowerCase());
  }

  return hashtags;
};

const createTweet = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Innehåll krävs" });
    }

    if (content.length > 140) {
      return res
        .status(400)
        .json({ message: "Tweets får max vara 140 tecken" });
    }

    const hashtags = extractHashtags(content);

    const tweet = await Tweet.create({
      content,
      user: req.user._id,
      hashtags,
    });

    await tweet.populate("user", "name nickname profilepicture");

    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTweets = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const following = user.following;

    following.push(req.user._id);

    const tweets = await Tweet.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate("user", "name nickname profilepicture")
      .limit(50);

    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTweetById = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate(
      "user",
      "name nickname profilepicture"
    );

    if (!tweet) {
      return res.status(404).json({ message: "Tweet hittades inte" });
    }

    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("user", "name nickname profilepicture");

    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getHashtagTweets = async (req, res) => {
  try {
    const hashtag = req.params.tag.toLowerCase();

    const tweets = await Tweet.find({ hashtags: hashtag })
      .sort({ createdAt: -1 })
      .populate("user", "name nickname profilepicture")
      .limit(50);

    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const likeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet hittades inte" });
    }

    if (tweet.likes.includes(req.user._id)) {
      return res.status(400).json({ message: "Tweet redan gillad" });
    }

    await Tweet.findByIdAndUpdate(req.params.id, {
      $push: { likes: req.user._id },
    });

    res.json({ message: "Tweet gillad" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const unlikeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet hittades inte" });
    }

    if (!tweet.likes.includes(req.user._id)) {
      return res.status(400).json({ message: "Tweet inte gillad än" });
    }

    await Tweet.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.user._id },
    });

    res.json({ message: "Gillning borttagen" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createTweet,
  getTweets,
  getTweetById,
  getUserTweets,
  getHashtagTweets,
  likeTweet,
  unlikeTweet,
};
