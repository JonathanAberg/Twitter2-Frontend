const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
  isFollowing,
  updateUserInfo,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);

router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "profilepicture", maxCount: 1 },
    { name: "coverpicture", maxCount: 1 },
  ]),
  updateUserInfo
);
router.get("/", protect, getUsers);
router.get("/:id", protect, getUserProfile);
router.post("/:id/follow", protect, followUser);
router.post("/:id/unfollow", protect, unfollowUser);
router.get("/:id/isFollowing", protect, isFollowing);

module.exports = router;
