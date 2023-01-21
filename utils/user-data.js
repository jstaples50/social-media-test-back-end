// const users = [];
// const getNamePart = () => names[Math.floor(Math.random() * names.length)];
// const getRandomName = () => `${getNamePart()} ${getNamePart()}`;

// module.exports = getRandomName;

const { User } = require("../models");

const users = [
  { username: "BethRocks20", email: "bethrocks@mail.com" },
  { username: "MarcusTHeMan", email: "marcusman@mail.com" },
  { username: "tenny789", email: "tenny789@mail.com" },
  { username: "jHurtsFan22", email: "hurtsdontit@mail.com" },
  { username: "giantsdude13", email: "giantsfan@mail.com" },
];

const randomFriend = (username, array) => {
  const ranFriend = array[Math.floor(Math.random() * array.length)];
  if (ranFriend.username === username) {
    return randomFriend(username, array);
  } else {
    return ranFriend._id;
  }
};

const assignRandomFriends = async () => {
  const allUsers = await User.find({});

  for (const user of allUsers) {
    await User.updateOne(
      { username: user.username },
      {
        $addToSet: {
          friends: randomFriend(user.username, allUsers),
        },
      }
    );
  }
};

module.exports = { users, assignRandomFriends };
