import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const MovieCategory = sequelize.define("MovieCategory", {
  trending: { type: DataTypes.BOOLEAN },
  recommended: { type: DataTypes.BOOLEAN },
  tvSeries: { type: DataTypes.BOOLEAN },
});

console.log(MovieCategory === sequelize.models.MovieCategory);

try {
  await MovieCategory.sync({ alter: true });
  console.log("The table for the Movies model was just (re)created!");
} catch (error) {
  console.error("Unable to sync:", error);
}

export default MovieCategory;
