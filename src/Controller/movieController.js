const Movie = require("../Model/movieModel");

exports.getAllMovies = async (req, res) => {
  try {
    const {
      search,
      genre,
      year,
      language,
      featured,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (genre) {
      filter.genre = {
        $in: [genre],
      };
    }

    if (year) {
      filter.releaseYear = Number(year);
    }

    if (language) {
      filter.language = language;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    const currentPage = Math.max(1, Number(page));
    const perPage = Math.min(50, Math.max(1, Number(limit)));
    const skip = (currentPage - 1) * perPage;

    let sortOption = { createdAt: -1 };

    if (sort === "rating") {
      sortOption = { rating: -1 };
    } else if (sort === "year") {
      sortOption = { releaseYear: -1 };
    } else if (sort === "title") {
      sortOption = { title: 1 };
    }

    const movies = await Movie.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    const totalMovies = await Movie.countDocuments(filter);

    res.status(200).json({
      success: true,
      totalMovies,
      currentPage,
      totalPages: Math.ceil(totalMovies / perPage),
      movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      movie,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

