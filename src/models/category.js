import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Category = sequelize.define("Category", {
  name: { type: DataTypes.STRING, allowNull: false },
});

console.log(Category === sequelize.models.Category);

try {
  await Category.sync({ alter: true });
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

export default Category;
