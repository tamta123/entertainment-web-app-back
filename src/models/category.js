import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Category = sequelize.define("Category", {
  name: { type: DataTypes.STRING, allowNull: false },
  icon: { type: DataTypes.STRING },
});

try {
  await Category.bulkCreate([
    { name: "movies", icon: "" },
    { name: "tvSeries", icon: "" },
  ]);
  console.log("Records inserted successfully!");

  await Category.sync({ alter: true });
  console.log("The table for the Category model was just (re)created!");
} catch (error) {
  console.error("Error:", error);
}

console.log(Category === sequelize.models.Category);

try {
  await Category.sync({ alter: true });
  console.log("The table for the Category model was just (re)created!");
} catch (error) {
  console.error("Unable to sync:", error);
}

export default Category;
