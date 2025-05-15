const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "nyckel", {
    expiresIn: "30d",
  });
};

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      nickname,
      about,
      occupation,
      hometown,
      website,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Användaren finns redan" });
    }

    const user = await User.create({
      name,
      email,
      password,
      nickname: nickname || name,
      about,
      occupation,
      hometown,
      website,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Felaktigt email eller lösenord" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Användare hittades inte" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      about,
      hometown,
      occupation,
      website,
      profileImage,
      coverImage,
    } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (about) updateData.about = about;
    if (hometown) updateData.hometown = hometown;
    if (occupation) updateData.occupation = occupation;
    if (website) updateData.website = website;
    if (profileImage) updateData.profileImage = profileImage;
    if (coverImage) updateData.coverImage = coverImage;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "Du kan inte följa dig själv" });
    }

    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res.status(400).json({ message: "Användare hittades inte" });
    }

    const currentUser = await User.findById(req.user._id);

    if (currentUser.following.includes(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Du följer redan denna användare" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: { following: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $push: { followers: req.user._id },
    });

    res.json({ message: "Användare följs nu" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res
        .status(400)
        .json({ message: "Du kan inte sluta följa dig själv" });
    }

    const userToUnfollow = await User.findById(req.params.id);
    if (!userToUnfollow) {
      return res.status(400).json({ message: "Användare hittades inte" });
    }

    const currentUser = await User.findById(req.user._id);

    if (!currentUser.following.includes(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Du följer inte denna användare" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.user._id },
    });

    res.json({ message: "Du följer inte längre denna användare" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
