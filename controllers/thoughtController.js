// EXAMPLE CONTROLLER

// const { Post, User } = require('../models');

// module.exports = {
//   getPosts(req, res) {
//     Post.find()
//       .then((posts) => res.json(posts))
//       .catch((err) => res.status(500).json(err));
//   },
//   getSinglePost(req, res) {
//     Post.findOne({ _id: req.params.postId })
//       .then((post) =>
//         !post
//           ? res.status(404).json({ message: 'No post with that ID' })
//           : res.json(post)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // create a new post
//   createPost(req, res) {
//     Post.create(req.body)
//       .then((post) => {
//         return User.findOneAndUpdate(
//           { _id: req.body.userId },
//           { $addToSet: { posts: post._id } },
//           { new: true }
//         );
//       })
//       .then((user) =>
//         !user
//           ? res
//               .status(404)
//               .json({ message: 'Post created, but found no user with that ID' })
//           : res.json('Created the post 🎉')
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },
// };

const { User, Thought } = require("../models");

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json(err);
  }
}

module.exports = { getAllUsers };
