const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getUserProfile,
  followUser,
  unfollowUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);

router.get("/", protect, getUsers);
router.get("/:id", protect, getUserProfile);
router.post("/:id/follow", protect, followUser);
router.post("/:id/unfollow", protect, unfollowUser);

module.exports = router;
