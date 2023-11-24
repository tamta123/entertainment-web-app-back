import Movie from "../models/movie.js";

export const getAllMovies = async (_, res) => {
  try {
    const data = await Movie.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
console.log("print print");

export const addMovie = async (req, res) => {
  try {
    const { title, posterSmall, posterMedium, posterLarge, rating, year } =
      req.body;
    console.log("tamta");
    const newMovie = await Movie.create({
      title: title,
      posterSmall: posterSmall,
      posterMedium: posterMedium,
      posterLarge: posterLarge,
      rating: rating,
      year: year,
    });
    console.log("gelashvili");
    console.log(newMovie.toJSON());
    return res.status(201).json(newMovie.toJSON());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
