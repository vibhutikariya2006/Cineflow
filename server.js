const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/Config/db");
require("dotenv").config();
const movieRoutes = require("./src/Routes/movieRoutes")
const authRoutes = require("./src/Routes/authRoutes")
const watchlistRoutes = require("./src/Routes/watchlistRoutes")
const dashboardRoutes = require("./src/Routes/dashboardRoutes")

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

app.get("/", (req, res) => {
  res.send("Cineflow Backend is running!");
});

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});