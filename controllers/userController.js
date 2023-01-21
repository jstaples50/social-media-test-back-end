const { User } = require("../models");
const { Types } = require("mongoose");

// GET functions

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("friends");
    res.json(users);
    console.log(`${req.method} request made`);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    // Check if id parameter is a valid mongoose ObjectId

    if (!Types.ObjectId.isValid(req.params.userId)) {
      res.status(404).json({ message: "No user found with that id" });
      return;
    }
    const user = await User.findOne({ _id: req.params.userId }).populate([
      "thoughts",
      "friends",
    ]);
    if (!user) {
      res.status(404).json({ message: "No user found with that id" });
    } else {
      res.json(user);
      console.log(`${req.method} request made`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// POST functions

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
    console.log(`${req.method} request made`);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addFriendToUser = async (req, res) => {
  try {
    // Check if id parameter is a valid mongoose ObjectId

    if (
      !Types.ObjectId.isValid(req.params.userId) ||
      !Types.ObjectId.isValid(req.params.friendId)
    ) {
      res.status(404).json({ message: "No user/friend found with that id" });
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user found with that id" });
    } else {
      res.status(203).json(user);
      console.log(`${req.method} request made`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT function

const updateUser = async (req, res) => {
  try {
    // Check if id parameter is a valid mongoose ObjectId

    if (!Types.ObjectId.isValid(req.params.userId)) {
      res.status(404).json({ message: "No user found with that id" });
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "No user found with that id" });
    } else {
      res.json(updatedUser);
      console.log(`${req.method} request made`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE functions

const deleteUser = async (req, res) => {
  try {
    // Check if id parameter is a valid mongoose ObjectId

    if (!Types.ObjectId.isValid(req.params.userId)) {
      res.status(404).json({ message: "No user found with that id" });
      return;
    }
    const userToDelete = await User.findByIdAndDelete(req.params.userId);
    if (!userToDelete) {
      res.status(404).json({ message: "No user found with that id" });
    } else {
      res.status(202).json({ message: "User successfully deleted" });
      console.log(`${req.method} request made`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteFriendFromUserFriendList = async (req, res) => {
  try {
    // Check if id parameter is a valid mongoose ObjectId

    if (
      !Types.ObjectId.isValid(req.params.userId) ||
      !Types.ObjectId.isValid(req.params.friendId)
    ) {
      res.status(404).json({ message: "No user/friend found with that id" });
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $pull: { friends: req.params.friendId },
      }
    );
    !user
      ? res.status(404).json({ message: "No friend found with that id" })
      : res.json({ message: "Friend deleted from friend's list" });
    console.log(`${req.method} request made`);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  deleteFriendFromUserFriendList,
};
