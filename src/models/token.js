// import { DataTypes } from "sequelize";
// import sequelize from "../database/database.js";
// import User from "./user.js";

// const Token = sequelize.define("Token", {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.INTEGER,
//   },

//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     onUpdate: "cascade",
//     onDelete: "cascade",
//     references: { model: "Users", key: "id" },
//   },

//   token: {
//     type: DataTypes.STRING,
//   },
// });
// console.log(Token === sequelize.models.Token);

// User.hasOne(Token, {
//   foreignKey: "userId",
// });
// Token.belongsTo(User);

// try {
//   await Token.sync({ alter: true });
//   console.log("The table for the Token model was just (re)created!");
// } catch (error) {
//   console.error("Unable to sync:", error);
// }

// export default Token;
