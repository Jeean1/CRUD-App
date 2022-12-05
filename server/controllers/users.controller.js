// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { userId, name, surname, gender } = req.body;

  const newUser = await User.create({
    userId,
    name,
    surname,
    gender,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { userId, name, surname, gender } = req.body;

  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  await user.update({ userId, name, surname, gender });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  await user.update({ status: "deleted" });

  res.status(200).json({ status: "success", message: "User has been deleted" });
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
