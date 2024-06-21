import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const HomeCategory = sequelize.define("HomeCategory", {
  name: { type: DataTypes.STRING, allowNull: false },
});

HomeCategory.bulkCreate([{ name: "trending" }, { name: "recommended4u" }]);

console.log(HomeCategory === sequelize.models.HomeCategory);

try {
  await HomeCategory.sync({ alter: true });
  console.log("The table for the HomeCategory model was just (re)created!");
} catch (error) {
  console.error("Unable to sync:", error);
}

export default HomeCategory;
