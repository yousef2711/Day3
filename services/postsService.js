const Post = require("../models/postModel");

const createPost = async (data) => {
  const post = await Post.create(data);
  return post;
};

const getAllPosts = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  const [posts, totalResults] = await Promise.all([
    Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  return {
    posts,
    pagination: {
      page,
      limit,
      totalPages,
      totalResults,
    },
  };
};

const getPostById = async (id) => {
  const post = await Post.findById(id);
  return post;
};

const updatePost = async (id, data) => {
  const post = await Post.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return post;
};

const deletePost = async (id) => {
  const post = await Post.findByIdAndDelete(id);
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
