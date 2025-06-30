import { body } from "express-validator";

export const signUpValidation = [
  body("userName")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("phoneNumber")
    .optional()
    .matches(/^\+91[6-9]\d{9}$/)
    .withMessage("Invalid Indian phone number format (e.g., +919876543210)"),
  body("email", "Either email or phone number is required").custom(
    (value, { req }) => {
      if (!value && !req.body.phoneNumber) {
        throw new Error("Either email or phone number is required");
      }
      return true;
    }
  ),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  body("fullName")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Full name can only contain letters and spaces"),
];

export const loginValidation = [
  body("identifier")
    .notEmpty()
    .withMessage("Username, email, or phone number is required")
    .custom((value) => {
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        value
      );
      const isPhone = /^\+91[6-9]\d{9}$/.test(value);
      const isUsername = /^[a-zA-Z0-9_]+$/.test(value);
      if (!isEmail && !isPhone && !isUsername) {
        throw new Error("Invalid username, email, or phone number format");
      }
      return true;
    }),
  body("password").notEmpty().withMessage("Password is required"),
];
