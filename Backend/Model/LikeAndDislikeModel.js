import mongoose from "mongoose";

const likeDislikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This sets up a reference to the User model
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu", // Reference to Menu model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const likeDislikeModel = mongoose.model("LikeAndDislike", likeDislikeSchema);

export default likeDislikeModel;
