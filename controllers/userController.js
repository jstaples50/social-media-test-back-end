const { User } = require("../models");

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

// function getUserById(req, res) {
//   User.findOne({ _id: req.params.userId })
//     // .populate(["thoughts", "friends"])
//     .select("-__v")
//     .then((user) =>
//       !user
//         ? res.status(404).json({ message: "No user found with that id" })
//         : res.json(user)
//     )
//     .catch((err) => res.status(500).json(err));
// }

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

// const deleteFriendFromUserFriendList = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       res.status(404).json({ message: "No user found with that id" });
//     } else {
//       const friendToDelete = user.friends.find(
//         (friend) => friend === req.params.friendId
//       );
//       const indexOfFriendToDelete = user.friends.indexOf(friendToDelete);
//       user.friends.splice(indexOfFriendToDelete, 1);
//       user.save();
//       res.json(user);
//       console.log(`${req.method} request made`);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const deleteFriendFromUserFriendList = async (req, res) => {
  try {
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
