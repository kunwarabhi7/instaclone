import { body } from "express-validator";

//  post Creation Validation

export const postValidation = [
  body("caption")
    .optional()
    .isLength({ max: 2200 })
    .withMessage("Caption cannot exceed 2200 characters")
    .trim(),
];

export const commentValidation = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Comment text is required")
    .isLength({ max: 1000 })
    .withMessage("Comment cannot exceed 1000 characters"),
];

export const updatePostValidation = [
  body("caption")
    .optional()
    .isLength({ max: 2200 })
    .withMessage("Caption cannot exceed 2200 characters")
    .trim(),
];
