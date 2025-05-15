const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, tweetController.createTweet);

router.get("/", protect, tweetController.getTweetById);

router.get("/:id", tweetController.getTweetById);

router.get("/user/:userId", tweetController.getUserTweets);

router.get("/hashtag/:tag", tweetController.getHashtagTweets);

router.post("/:id/like", protect, tweetController.likeTweet);
router.post("/:id/unlike", protect, tweetController.unLikeTweet);

module.exports = router;
