const Post = require("../models/posts");

//Getting All Posts
exports.get_posts = async (req, res) => {
  try {
    const posts = await Post.find().exec();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Getting One Post
exports.get_one_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("comments")
      .populate("author")
      .exec();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};
