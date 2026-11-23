const User = require("../Model/UserModel");
const Movie = require("../Model/movieModel");

exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("watchlist");

    res.status(200).json({
      success: true,
      watchlist: user.watchlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required",
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const user = await User.findById(req.user._id);

    // Check if movie is already in watchlist
    if (user.watchlist.includes(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Movie already exists in watchlist",
      });
    }

    user.watchlist.push(movieId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Movie added to watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(req.user._id);

    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Movie removed from watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

