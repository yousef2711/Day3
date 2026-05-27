const Post = require("../models/postModel");
const APIError = require('../utils/apiError');

const createPost = async (data, userId) => {
  const post = await Post.create({ ...data, userId });
  return post;
};

const getAllPosts = async (query, userId) => {
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
    Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('userId', 'name email'),
    Post.countDocuments(filter),
  ]);

  const postsWithOwnership = posts.map((p) => {
    const obj = p.toObject();
    obj.isOwner = p.userId && p.userId._id.toString() === String(userId);
    return obj;
  });

  const totalPages = Math.ceil(totalResults / limit);

  return {
    posts: postsWithOwnership,
    pagination: {
      page,
      limit,
      totalPages,
      totalResults,
    },
  };
};

const getPostById = async (id, userId) => {
  const post = await Post.findById(id).populate('userId', 'name email');
  if (!post) return null;
  const obj = post.toObject();
  obj.isOwner = post.userId && post.userId._id.toString() === String(userId);
  return obj;
};

const updatePostById = async (id, data, userId) => {
  const post = await Post.findById(id);
  if (!post) return null;
  if (post.userId.toString() !== String(userId)) {
    throw new APIError('Forbidden', 403);
  }

  Object.assign(post, data);
  await post.save();
  return await Post.findById(id).populate('userId', 'name email');
};

const deletePostById = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) return null;
  if (post.userId.toString() !== String(userId)) {
    throw new APIError('Forbidden', 403);
  }
  await post.deleteOne();
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
