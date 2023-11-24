import Category from "../models/category.js";

export const getAllCategories = async (_, res) => {
  try {
    const data = await Category.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
console.log("print print");

export const addCategory = async (req, res) => {
  try {
    const { trending, recommended, tvSeries } = req.body;
    const addCategory = await Category.create({
      trending: trending,
      recommended: recommended,
      tvSeries: tvSeries,
    });
    console.log(addCategory.toJSON());
    return res.status(201).json(addCategory.toJSON());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
