import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const User = sequelize.define("User", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: "unique_email",
      msg: "The email address is already registered.",
    },
    validate: {
      isEmail: { msg: "Invalid email format." },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isStrongPassword(value) {
        if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
            value
          )
        ) {
          throw new Error("Password does not meet complexity requirements");
        }
      },
    },
    len: {
      args: [8, 20],
      msg: "Password must be between 8 and 20 characters long.",
    },
  },
  photo: { type: DataTypes.STRING },
});
console.log(User === sequelize.models.User);

// try {
//   await User.sync({ alter: true });
//   console.log("The table for the User model was just (re)created!");
// } catch (error) {
//   console.error("Unable to sync:", error);
// }

export default User;
