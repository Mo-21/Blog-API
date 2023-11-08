const Comment = require("../models/comments");
const { body, validateResult } = require("express-validator");

exports.post_comment = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 25 })
    .withMessage("Max 25 characters allowed")
    .escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 500 })
    .withMessage("Max 500 characters allowed")
    .escape(),
  async (req, res) => {
    const errors = validateResult(req);
    try {
      const comment = new Comment({
        username: req.body.username,
        content: req.body.content,
        creationDate: Date.now(),
      });

      if (!errors.isEmpty()) {
        res.status(500).json(errors.array());
      } else {
        await comment.save();
        res.status(200).json(comment);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
];
