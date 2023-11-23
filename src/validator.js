// import Joi from "joi";
// import { default as pool } from "./database/database.js";
// import User from "./models/user.js";

// const validator = (Schema) => async (payload) => {
//   try {
//     // Check if a user with the given email already exists in the database
//     const existingUser = await User.findOne({
//       where: { email: payload.email },
//     });
//     if (existingUser) {
//       throw new Error("A user with this email already exists");
//     }
//     const { error, value } = Schema.validate(payload, { abortEarly: false });

//     if (error) {
//       throw error;
//     }

//     return value;
//   } catch (error) {
//     throw error;
//   }
// };

// const userSchema = Joi.object({
//   name: Joi.string().required().max(15),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).max(15).required(),
//   photo: Joi.string(),
// });

// export const validateUser = validator(userSchema);
