// EXAMPLE API INDEX FILE

// const router = require('express').Router();
// const postRoutes = require('./postRoutes');
// const userRoutes = require('./userRoutes');

// router.use('/posts', postRoutes);
// router.use('/users', userRoutes);

// module.exports = router;

const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughRoutes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
