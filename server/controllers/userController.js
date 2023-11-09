const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Post = require("../models/posts");
const User = require("../models/user");

exports.get_dashboard = asyncHandler(async (req, res) => {
  const [posts] = await Promise.all([
    Post.find().populate("author").populate("comments").exec(),
  ]);

  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(500).json("No posts");
  }
});

exports.create_post = [
  body("title")
    .trim()
    .isLength({ max: 25 })
    .withMessage("Max 25 characters allowed")
    .escape(),
  body("content").trim().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { _id, username } = await User.findById(req.user.id);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: _id,
    });
    if (!errors.isEmpty()) {
      res.json(errors.array().msg);
    } else {
      try {
        await post.save();
        // const author = await User.findById(req.params.userId);
        res.status(201).json({
          _id: post.id,
          title: req.body.title,
          content: req.body.content,
          author: username,
          comments: req.body.comments,
        });
      } catch (err) {
        res.status(401).json(err);
      }
    }
  }),
];

exports.edit_post = [
  body("title")
    .trim()
    .isLength({ max: 25 })
    .withMessage("Max 25 characters allowed")
    .escape(),
  body("content").trim().escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { _id } = await User.findById(req.user.id);

    const post = new Post({
      _id: req.params.postId,
      title: req.body.title,
      content: req.body.content,
      author: _id,
    });
    if (!errors.isEmpty()) {
      res.json(errors.array().msg);
    } else {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.postId,
          post,
          {},
        );
        res.status(201).json(updatedPost);
      } catch (err) {
        res.status(401).json(err);
      }
    }
  }),
];

exports.delete_post = asyncHandler(async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    res.status(201).json(deletedPost);
  } catch (err) {
    res.status(401).json(err);
  }
});
