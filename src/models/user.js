import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const User = sequelize.define("User", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  },
  hashedPassword: {
    type: DataTypes.STRING(64),
    allowNull: false,
    // validate: {
    //   is: /^[0-9a-f]{64}$/i,
    // },
  },
  photo: { type: DataTypes.STRING, allowNull: false },
});
console.log(User === sequelize.models.User);

console.log("The table for the User model was just (re)created!");

try {
  await User.sync({ alter: true });
  console.log("The table for the User model was just (re)created!");
} catch (error) {
  console.error("Unable to sync:", error);
}

// const Jane = await User.create({
//   firstName: "Jane",
//   email: "Jane@gmail.com",
//   hashedPassword: "9804q35ijqreqp",
//   photo: "photo",
// });

// console.log(Jane.toJSON());

export default User;
