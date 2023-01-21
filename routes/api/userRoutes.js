const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  deleteFriendFromUserFriendList,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);
router
  .route("/:userId/friends/:friendId")
  .post(addFriendToUser)
  .delete(deleteFriendFromUserFriendList);

module.exports = router;
