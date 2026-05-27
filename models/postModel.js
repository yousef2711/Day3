const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      minlength: [5, "Title must be at least 5 characters"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: [10, "Content must be at least 10 characters"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Tech", "Life", "Health", "Education"],
      default: "Life",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
