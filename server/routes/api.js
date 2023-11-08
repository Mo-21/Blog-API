const router = require("express").Router();

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");
const auth_controller = require("../controllers/auth");
const { protect } = require("../middleware/authenticateUser");

//Normal visitor
router.get("/posts", post_controller.get_posts);
router.get("/posts/:id", post_controller.get_one_post);
router.post("/posts/:id/comment", comment_controller.post_comment);
// router.get("/user", user_controller.get_user);

//Editor
router.post("/register", auth_controller.user_register);
router.post("/login", auth_controller.user_login);
//Should return all posts
router.get("/dashboard", protect, user_controller.get_dashboard);
router.post("/dashboard/create", protect, user_controller.create_post);
router.put("/dashboard/:postId/edit", protect, user_controller.edit_post);
router.delete(
  "/dashboard/:postId/delete",
  protect,
  user_controller.delete_post,
);

module.exports = router;
