const express = require("express");
const User = require("../models/user");
const {getAllUsers,getUserbyId, createUser, updateUserById, deleteUserById}=require('../controllers/user')

const router = express.Router();

// GET all users,post new user
router.route("/").get(getAllUsers).post(createUser); 

// GET, PATCH, DELETE user by ID
router.route("/:id")
    .get(getUserbyId)
    .patch(updateUserById)
    .delete(deleteUserById);
module.exports = router;