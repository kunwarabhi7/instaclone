import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Invalid image URL"],
    },
    caption: {
      type: String,
      default: "",
      trim: true,
      maxlength: [2200, "Caption cannot exceed 2200 characters"],
    },
    likesCount: {
      type: Number,
      default: 0,
      min: [0, "Likes can't be negitive"],
    },
    commentsCount: {
      type: Number,
      default: 0,
      min: [0, "Comments count cannot be negative"],
    },
  },

  { timestamps: true }
);

postSchema.index({ userId: 1 });

const Post = mongoose.model("Post", postSchema);
export { Post };
