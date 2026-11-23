const express = require("express");
const { getDashboardStats } = require("../Controller/dashboardController");
const { adminOnly, protect } = require("../Middleware/authMiddleware");
const router = express.Router();


router.get("/stats", protect, adminOnly, getDashboardStats);

module.exports = router;