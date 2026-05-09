const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const uploadController = require("../controllers/upload.controller");

router.post("/imageupload",authMiddleware,upload.single("image"),uploadController);

module.exports = router;