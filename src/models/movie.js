import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Category from "./category.js";

const Movie = sequelize.define("Movie", {
  title: { type: DataTypes.STRING, allowNull: false },
  posterSmall: { type: DataTypes.STRING },
  posterMedium: { type: DataTypes.STRING },
  posterLarge: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING },
  year: { type: DataTypes.INTEGER },
});

console.log(Movie === sequelize.models.Movie);

//one to many => hasMany, belongsTo
Category.hasMany(Movie, {
  foreignKey: {
    type: DataTypes.UUID,
  },
});
Movie.belongsTo(Category);

try {
  await sequelize.sync({ alter: true });

  //this is for deleting the certain movies (if needed)
  // const titlesToDelete = ["string", "Beyond Earth"];

  // // Find and delete movies with the specified titles
  // await Promise.all(
  //   titlesToDelete.map(async (title) => {
  //     // Find the movie based on title
  //     const movieToDelete = await Movie.findOne({ where: { title } });

  //     // If the movie exists, delete it
  //     if (movieToDelete) {
  //       await movieToDelete.destroy();
  //       console.log(`Movie with title "${title}" deleted successfully.`);
  //     } else {
  //       console.log(`Movie with title "${title}" not found.`);
  //     }
  //   })
  // );

  // this is to belong the certain movie to certain category

  const categoryMovie = await Category.findOne({ where: { name: "movies" } });
  const moviesData = [{ title: "1998" }];
  const movies = await Promise.all(
    moviesData.map(async (data) => await Movie.findOrCreate({ where: data }))
  );
  console.log(movies);
  await categoryMovie.addMovies(movies.map(([movie]) => movie));
  console.log("Movies associated with the category successfully!");
  // console.log("The table for the Movies model was just (re)created!");
} catch (error) {
  console.error("Unable to sync:", error);
  // } catch (error) {
  //   // try {
  //   //   await sequelize.drop();
  //   //   console.log("table dropped successfully");
  //   console.error("Unable to delete:", error);
}

export default Movie;
