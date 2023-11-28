import Movie from "../models/movie.js";

export const getAllMovies = async (_, res) => {
  try {
    const data = await Movie.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const addMovie = async (req, res) => {
  try {
    const {
      CategoryId,
      title,
      posterSmall,
      posterMedium,
      posterLarge,
      rating,
      year,
    } = req.body;
    const newMovie = await Movie.create({
      CategoryId: CategoryId,
      title: title,
      posterSmall: posterSmall,
      posterMedium: posterMedium,
      posterLarge: posterLarge,
      rating: rating,
      year: year,
    });
    console.log(newMovie.toJSON());
    return res.status(201).json(newMovie.toJSON());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
