const express = require("express").Router();
const router = express();
const jwt = require("jsonwebtoken");

router.get("/posts", (req, res) => {
  // res.json({
  //   message: "welcome",
  // });
  res.send("message");
});

router.post("/posts", (req, res) => {
  res.send("message");
});

// app.post("/api/posts", (req, res) => {
//   jwt.verify(req.token, "secret", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       req.json({
//         message: "Post Created",
//         authData,
//       });
//     }
//   });
// });

//User Register
router.get("/register", {})

module.exports = router;
