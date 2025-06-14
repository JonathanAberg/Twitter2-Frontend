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

const getLikedTweets = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const likedTweets = await Tweet.find({ likes: userId })
      .sort({ createdAt: -1 })
      .populate("user", "name nickname profileImage");

    res.json(likedTweets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const tweetId = req.params.id;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    if (content.length > 140) {
      return res
        .status(400)
        .json({ message: "Comments cannot exceed 140 characters" });
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const comment = {
      content,
      user: req.user._id,
      likes: [],
    };

    tweet.comments.push(comment);
    await tweet.save();

    const populatedTweet = await Tweet.findById(tweetId)
      .populate("user", "name nickname profilepicture")
      .populate("comments.user", "name nickname profilepicture");

    const newComment =
      populatedTweet.comments[populatedTweet.comments.length - 1];

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId).populate(
      "comments.user",
      "name nickname profilepicture"
    );

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    res.json(tweet.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCommentsCount = async (req, res) => {
  try {
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const count = tweet.comments.length;
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { tweetId, commentId } = req.params;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const comment = tweet.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    tweet.comments.pull({ _id: commentId });
    await tweet.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const likeComment = async (req, res) => {
  try {
    const { tweetId, commentId } = req.params;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const comment = tweet.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const userId = req.user._id;
    const likeIndex = comment.likes.indexOf(userId);

    if (likeIndex === -1) {
      comment.likes.push(userId);
    } else {
      comment.likes.splice(likeIndex, 1);
    }

    await tweet.save();

    res.json({ likes: comment.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    if (tweet.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this tweet" });
    }

    await Tweet.findByIdAndDelete(tweetId);
    res.status(200).json({ message: "Tweet deleted successfully" });
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
  getLikedTweets,
  deleteTweet,
  addComment,
  getComments,
  deleteComment,
  likeComment,
  getCommentsCount,
};
