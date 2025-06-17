const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// All routes below require admin access
router.use(protect, adminMiddleware);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id/make-admin", userController.makeAdmin);
router.put("/:id/remove-admin", userController.removeAdmin);
router.delete("/:id", userController.softDeleteUser);

module.exports = router;
