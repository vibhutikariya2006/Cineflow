const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    banner: {
      type: String,
      default: "",
    },

    genre: {
      type: [String],
      required: true,
    },

    releaseYear: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    language: {
      type: String,
      default: "English",
    },

    trailerUrl: {
      type: String,
      default: "",
    },

    movieUrl: {
      type: String,
      default: "",
    },

    cast: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);

