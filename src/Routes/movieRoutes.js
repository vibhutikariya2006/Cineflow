const express = require("express");
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require("../Controller/movieController");
const { adminOnly, protect } = require("../Middleware/authMiddleware");
const router = express.Router();


router.get("/", getAllMovies);
router.get("/:id", getMovieById);

router.post("/", protect, adminOnly, createMovie);
router.put("/:id", protect, adminOnly, updateMovie);
router.delete("/:id", protect, adminOnly, deleteMovie);

module.exports = router;