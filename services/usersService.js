const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const APIError = require('../utils/apiError');

const signUp = async ({ name, email, password, age, bio }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new APIError('Email already in use', 400);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, age, bio });
  return user;
};

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError('Invalid email or password', 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new APIError('Invalid email or password', 401);
  }

  const token = jwt.sign({ userId: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const getAllUsers = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i",
    };
  }

  const [users, totalCount] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};

const countUsers = async () => {
  const totalUsers = await User.countDocuments();
  return totalUsers;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return user;
};

module.exports = {
  signUp,
  signIn,
  getUserById,
  getAllUsers,
  countUsers,
  deleteUser,
  updateUser,
};




