const User = require("../models/userModel");

const createUser = async ({ name, email, password, age, bio }) => {
  const user = await User.create({ name, email, password, age, bio });
  return user;
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
  createUser,
  getUserById,
  getAllUsers,
  countUsers,
  deleteUser,
  updateUser,
};




