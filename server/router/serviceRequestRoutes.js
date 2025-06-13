// routes/requestRoutes.js
const express = require("express");
const router = express.Router();
const  protect  = require("../middlewares/authMiddleware");
const {
    createRequest,
    getUserRequests,
    getProviderRequests,
    respondToRequest,
    deleteRequest,
} = require("../controllers/serviceRequestController");

router.post("/", protect, createRequest); // user sends request
router.get("/my-requests", protect, getUserRequests); // user views requests
router.get("/provider-requests", protect, getProviderRequests); // provider views requests
router.put("/respond/:id", protect, respondToRequest); // provider responds
router.delete("/:id", protect, deleteRequest); // user deletes request

module.exports = router;
