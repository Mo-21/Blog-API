const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Post = require("../models/posts");

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
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    try {
      const comment = new Comment({
        username: req.body.username,
        content: req.body.content,
        creationDate: Date.now(),
      });
      const post = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $push: {
            comments: comment._id,
          },
        },
        { new: true },
      );
      if (!errors.isEmpty()) {
        res.status(500).json(errors.array().message);
      } else {
        await comment.save();
        await post.save();
        res.status(200).json(comment);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }),
];
