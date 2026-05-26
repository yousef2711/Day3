const postsService = require("../services/postsService");
const { success, error } = require("../utils/apiResponse");

const createPost = async (req, res, next) => {
  try {
    const post = await postsService.createPost(req.body);
    return success(res, 201, "Post created successfully", post);
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const result = await postsService.getAllPosts(req.query);
    return success(res, 200, "Posts fetched successfully", result);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    if (!post) {
      return error(res, 404, "Post not found");
    }
    return success(res, 200, "Post fetched successfully", post);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await postsService.updatePost(req.params.id, req.body);
    if (!post) {
      return error(res, 404, "Post not found");
    }
    return success(res, 200, "Post updated successfully", post);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await postsService.deletePost(req.params.id);
    if (!post) {
      return error(res, 404, "Post not found");
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
  updatePost,
  deletePost,
};
