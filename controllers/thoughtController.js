const { Thought, User } = require("../models");

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
    const newThought = await Thought.create(req.body);
    const associatedUser = await User.findOneAndUpdate(
      { username: newThought.username },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );
    console.log(`${req.method} request made`);
    if (!associatedUser) {
      res.status(404).json({
        message: "Thought created but not associated with a user",
      });
    } else {
      res.status(201).json(newThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT function

const updateThought = async (req, res) => {
  try {
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

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
};
