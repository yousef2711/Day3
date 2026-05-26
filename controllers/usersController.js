const userService = require("../services/usersService");
const { success, error } = require("../utils/apiResponse");

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return success(res, 201, "User created successfully", user);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return error(res, 404, "User not found");
    }
    return success(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers(req.query);
    return success(res, 200, "Users fetched successfully", result);
  } catch (err) {
    next(err);
  }
};

const countUsers = async (req, res, next) => {
  try {
    const totalUsers = await userService.countUsers();
    return success(res, 200, "User count fetched successfully", { totalUsers });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return error(res, 404, "User not found");
    }
    return success(res, 200, "User deleted successfully");
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return error(res, 404, "User not found");
    }
    return success(res, 200, "User updated successfully", user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  countUsers,
  deleteUser,
  updateUser,
};