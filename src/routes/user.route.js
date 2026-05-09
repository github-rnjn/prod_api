const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const tokenController = require("../controllers/token.controller");

router.get("/",authMiddleware,authorizeRoles("admin"),userController.getAllUsers);
router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
router.post("/logout",authMiddleware,userController.logout);
router.put("/update-profile",authMiddleware,userController.updateProfile);
router.put("/change-password",authMiddleware,userController.changePassword);
router.put("/refresh-token",tokenController.refreshToken)

module.exports = router;