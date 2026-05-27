const postsService = require("../services/postsService");
const { success, error } = require("../utils/apiResponse");
const APIError = require('../utils/apiError');

const createPost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const post = await postsService.createPost(req.body, userId);
    return success(res, 201, "Post created successfully", post);
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await postsService.getAllPosts(req.query, userId);
    return success(res, 200, "Posts fetched successfully", result);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const post = await postsService.getPostById(req.params.id, userId);
    if (!post) {
      throw new APIError('Post not found', 404);
    }
    return success(res, 200, "Post fetched successfully", post);
  } catch (err) {
    next(err);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const post = await postsService.updatePostById(req.params.id, req.body, userId);
    if (!post) {
      throw new APIError('Post not found', 404);
    }
    return success(res, 200, "Post updated successfully", post);
  } catch (err) {
    next(err);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const post = await postsService.deletePostById(req.params.id, userId);
    if (!post) {
      throw new APIError('Post not found', 404);
    }
    return success(res, 200, "Post deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
