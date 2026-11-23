const express = require("express");
const router = express.Router();

const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} = require("../Controller/watchlistController");

const { protect } = require("../Middleware/authMiddleware");

router.get("/", protect, getWatchlist);

router.post("/", protect, addToWatchlist);

router.delete("/:movieId", protect, removeFromWatchlist);

module.exports = router;