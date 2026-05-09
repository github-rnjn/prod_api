const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.get("/",authMiddleware,authorizeRoles("admin"),userController.getAllUsers);
router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);

module.exports = router;