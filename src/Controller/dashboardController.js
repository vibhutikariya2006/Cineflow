const Movie = require("../Model/movieModel");
const User = require("../Model/UserModel");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    // Average movie rating 
    const ratingData = await Movie.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRating =
      ratingData.length > 0
        ? Number(ratingData[0].averageRating.toFixed(1))
        : 0;

    // Movies grouped by genre
    const genreStats = await Movie.aggregate([
      { $unwind: "$genre" },
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Movies grouped by release year
    const yearStats = await Movie.aggregate([
      {
        $group: {
          _id: "$releaseYear",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Recently added movies
    const recentMovies = await Movie.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title poster releaseYear rating createdAt");

    // Featured movies count
    const featuredMovies = await Movie.countDocuments({
      featured: true,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalMovies,
        totalUsers,
        totalAdmins,
        averageRating,
        featuredMovies,
      },
      genreStats,
      yearStats,
      recentMovies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
