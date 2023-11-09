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
    const post = await Post.findById(req.params.postId)
      .populate("comments")
      .populate("author")
      .exec();

    if (post === null) {
      res.status(500).json("Null, Cannot Find This Post.");
    } else {
      res.status(200).json(post);
    }
    return;
  } catch (err) {
    res.status(500).json(err);
  }
};
