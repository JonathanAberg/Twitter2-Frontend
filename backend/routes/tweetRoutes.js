const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, tweetController.createTweet);
router.delete("/:id", protect, tweetController.deleteTweet);

router.get("/", protect, tweetController.getTweets);

router.get("/:id", tweetController.getTweetById);

router.get("/user/:userId", tweetController.getUserTweets);

router.get("/liked/:userId", tweetController.getLikedTweets);

router.get("/hashtag/:tag", tweetController.getHashtagTweets);

router.post("/:id/like", protect, tweetController.likeTweet);
router.post("/:id/unlike", protect, tweetController.unlikeTweet);

router.post("/:id/comments", protect, tweetController.addComment);
router.get("/:id/comments", tweetController.getComments);

router.get("/:id/comments/count", tweetController.getCommentsCount);

router.delete(
  "/:tweetId/comments/:commentId",
  protect,
  tweetController.deleteComment
);
router.post(
  "/:tweetId/comments/:commentId/like",
  protect,
  tweetController.likeComment
);
module.exports = router;
