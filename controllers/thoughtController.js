const { Thought, User } = require("../models");
const { Types } = require("mongoose");

// GET functions

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
    console.log(`${req.method} request made`);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleThought = async (req, res) => {
  try {
    if (!Types.ObjectId.isValid(req.params.thoughtId)) {
      res.status(404).json({ message: "No thought found with that id" });
      return;
    }
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      res.status(404).json({ message: "No thought found with that id" });
    } else {
      res.json(thought);
      console.log(`${req.method} request made`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST function

const createThought = async (req, res) => {
  try {
    const checkForUser = await User.findOne({ username: req.body.username });
    console.log(checkForUser);
    if (!checkForUser) {
      res
        .status(400)
        .json({ message: "Thought must be associated with a current user" });
      return;
    }
    const newThought = await Thought.create(req.body);
    const associatedUser = await User.findOneAndUpdate(
      { username: newThought.username },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );
    console.log(`${req.method} request made`);

    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT function

const updateThought = async (req, res) => {
  try {
    if (!Types.ObjectId.isValid(req.params.thoughtId)) {
      res.status(404).json({ message: "No thought found with that id" });
      return;
    }
    const updatedThought = await Thought.findByIdAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "No thought found with that id" });
    } else {
      res.status(202).json(updatedThought);
      console.log(`${req.method} request made`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE function

const deleteThought = async (req, res) => {
  try {
    if (!Types.ObjectId.isValid(req.params.thoughtId)) {
      res.status(404).json({ message: "No thought found with that id" });
      return;
    }
    const thoughtToDelete = await Thought.findByIdAndDelete(
      req.params.thoughtId
    );
    if (!thoughtToDelete) {
      res.status(404).json({ message: "No thought found with that id" });
    } else {
      res.status(204).json({ message: "User successfully deleted" });
      console.log(`${req.method} request made`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// ADD a reaction to a thought

const addReaction = async (req, res) => {
  try {
    if (!Types.ObjectId.isValid(req.params.thoughtId)) {
      res.status(404).json({ message: "No thought found with that id" });
      return;
    }
    const thoughtToAddReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    !thoughtToAddReaction
      ? res.status(404).json({ message: "No thought found with that id" })
      : res.status(200).json(thoughtToAddReaction);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE a reaction from a thought

const deleteReaction = async (req, res) => {
  try {
    if (
      !Types.ObjectId.isValid(req.params.thoughtId) ||
      !Types.ObjectId.isValid(req.params.reactionId)
    ) {
      res
        .status(404)
        .json({ message: "No thought/reaction found with that id" });
      return;
    }

    const thought = await Thought.findOne({
      _id: req.params.thoughtId,
    });

    const reaction = () => {
      for (const reaction of thought.reactions) {
        if (reaction._id == req.params.reactionId) {
          return true;
        } else {
          return false;
        }
      }
    };

    if (!thought || !reaction()) {
      res.status(404).json({
        message: "No thought/reaction found with that id",
      });
      return;
    }

    const thoughtToDeleteReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: {
          reactions: { _id: req.params.reactionId },
        },
      }
    );

    res.status(202).json({
      message: "reaction successfully deleted",
    });

    console.log(`${req.method} request made`);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
};
