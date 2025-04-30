import mongoose from "mongoose";

const foodItems = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
});

const menuSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    required: "true",
  },
  type: {
    type: String,
    enum: ["breakfast", "lunch", "evening_snacks", "dinner"],
    required: true,
  },
  breakfast: {
    type: [foodItems],
  },
});

const MenuModel = mongoose.model("Menu", menuSchema);

export default MenuModel;
