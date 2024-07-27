import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const BookMark = sequelize.define("BookMark", {
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
console.log(BookMark === sequelize.models.BookMark);

try {
  await BookMark.sync({ alter: true });
  console.log("The table for the User model was just (re)created!");
  // await BookMark.drop();
  // console.log("The BookMark table was dropped!");
} catch (error) {
  console.error("Unable to sync:", error);
}

export default BookMark;
