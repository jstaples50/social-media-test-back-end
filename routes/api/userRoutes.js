// EXAMPLE USER ROUTE

// const router = require('express').Router();
// const {
//   getUsers,
//   getSingleUser,
//   createUser,
// } = require('../../controllers/userController');

// // /api/users
// router.route('/').get(getUsers).post(createUser);

// // /api/users/:userId
// router.route('/:userId').get(getSingleUser);

// module.exports = router;

const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getUserById).put(updateUser);

module.exports = router;
