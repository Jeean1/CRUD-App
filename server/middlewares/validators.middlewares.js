const { body, validationResult } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body("userId")
    .isNumeric()
    .withMessage("Id nro must be a number")
    .notEmpty()
    .withMessage("Id nro cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Id nro must be at least 4 characters"),
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("surname")
    .isString()
    .withMessage("Surname must be a string")
    .notEmpty()
    .withMessage("Surname cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Surname must be at least 3 characters"),
  body("gender").notEmpty().withMessage("Select a gender"),

  checkValidations,
];

module.exports = { createUserValidators };
