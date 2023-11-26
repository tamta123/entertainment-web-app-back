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

Category.hasMany(Movie);

try {
  await sequelize.sync({ force: true });
  console.log("The table for the Movies model was just (re)created!");
} catch (error) {
  console.error("Unable to sync:", error);
}

// try {
//   await sequelize.drop();
//   console.log("table dropped successfully");
// } catch (error) {
//   console.error("Unable to delete:", error);
// }

export default Movie;
