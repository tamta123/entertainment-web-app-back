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

// Movie.bulkCreate([
//   {
//     title: "Same Answer II",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/same-answer-2/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/same-answer-2/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/same-answer-2/regular/large.jpg",
//     rating: "E",
//     year: 2017,
//   },
//   {
//     title: "Below Echo",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/below-echo/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/below-echo/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/below-echo/regular/large.jpg",
//     rating: "PG",
//     year: 2016,
//   },
//   {
//     title: "The Rockies",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-rockies/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-rockies/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-rockies/regular/large.jpg",
//     rating: "E",
//     year: 2015,
//   },
//   {
//     title: "Relentless",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/relentless/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/relentless/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/relentless/regular/large.jpg",
//     rating: "PG",
//     year: 2017,
//   },
//   {
//     title: "Community of Ours",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/community-of-ours/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/community-of-ours/regular/small.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/community-of-ours/regular/small.jpg",
//     rating: "18+",
//     year: 2018,
//   },
//   {
//     title: "Van Life",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/van-life/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/van-life/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/van-life/regular/large.jpg",
//     rating: "PG",
//     year: 2015,
//   },
//   {
//     title: "The Heiress",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-heiress/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-heiress/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-heiress/regular/large.jpg",
//     rating: "PG",
//     year: 2021,
//   },
//   {
//     title: "Off the Track",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/off-the-track/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/off-the-track/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/off-the-track/regular/large.jpg",
//     rating: "18+",
//     year: 2017,
//   },
//   {
//     title: "Whispering Hill",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/whispering-hill/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/whispering-hill/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/whispering-hill/regular/large.jpg",
//     rating: "E",
//     year: 2017,
//   },
//   {
//     title: "112",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/112/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/112/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/112/regular/large.jpg",
//     rating: "PG",
//     year: 2013,
//   },
//   {
//     title: "Lone Heart",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/lone-heart/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/lone-heart/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/lone-heart/regular/large.jpg",
//     rating: "E",
//     year: 2017,
//   },
//   {
//     title: "Production Line",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/production-line/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/production-line/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/production-line/regular/large.jpg",
//     rating: "PG",
//     year: 2018,
//   },
//   {
//     title: "Dogs",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/dogs/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/dogs/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/dogs/regular/large.jpg",
//     rating: "E",
//     year: 2016,
//   },
//   {
//     title: "Asia in 24 Days",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/asia-in-24-days/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/asia-in-24-days/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/asia-in-24-days/regular/large.jpg",
//     rating: "PG",
//     year: 2020,
//   },
//   {
//     title: "The Tasty Tour",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-tasty-tour/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-tasty-tour/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/the-tasty-tour/regular/large.jpg",
//     rating: "PG",
//     year: 2016,
//   },
//   {
//     title: "Darker",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/darker/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/darker/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/darker/regular/large.jpg",
//     rating: "18+",
//     year: 2017,
//   },
//   {
//     title: "Unresolved Cases",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/unresolved-cases/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/unresolved-cases/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/unresolved-cases/regular/large.jpg",
//     rating: "18+",
//     year: 2018,
//   },
//   {
//     title: "Mission: Saturn",
//     posterSmall:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/mission-saturn/regular/small.jpg",
//     posterMedium:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/mission-saturn/regular/medium.jpg",
//     posterLarge:
//       "https://entertainment-web-app-back-production.up.railway.app/thumbnails/mission-saturn/regular/large.jpg",
//     rating: "PG",
//     year: 2017,
//   },
// ]);

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

  // this is the code, to belong the certain movie to certain category

  const categoryMovie = await Category.findOne({ where: { name: "movies" } });
  const moviesData = [
    { title: "Mission: Saturn" },
    { title: "Darker" },
    { title: "Whispering Hill" },
    { title: "Off the Track" },
    { title: "The Heiress" },
    { title: "Van Life" },
    { title: "Relentless" },
    { title: "Same Answer II" },
  ];
  const movies = await Promise.all(
    moviesData.map(async (data) => await Movie.findOrCreate({ where: data }))
  );
  await categoryMovie.addMovies(movies.map(([movie]) => movie));
  console.log("Movies associated with the category successfully!");
} catch (error) {
  console.error("Unable to sync:", error);
  // } catch (error) {
  //   // try {
  //   //   await sequelize.drop();
  //   //   console.log("table dropped successfully");
  //   console.error("Unable to delete:", error);
}

export default Movie;
