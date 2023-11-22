// import Joi from "joi";
// import { default as pool } from "./database/database.js";

// const validator = (Schema) => async (payload) => {
//   try {
//     const existingUserQuery = {
//       text: "SELECT * FROM users WHERE email = $1",
//       values: [payload.email],
//     };
//     const { rows: existingUsers } = await pool.query(existingUserQuery);
//     if (existingUsers.length > 0) {
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
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).max(15).required(),
//   photo: Joi.string(),
//   bookmarks: Joi.string(),
//   confirmPassword: Joi.ref("password"),
// });

// export const validateUser = validator(userSchema);
