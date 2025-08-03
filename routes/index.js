const express = require("express");
const router = express.Router();
const userRouter = require("../modules/users/user.api");
const blogRouter = require("../modules/blogs/blog.api")

router.get("/api/v1", (req, res, next) => {
  try {
    res.json({ msg: "Blogs Backend API is working" });
  } catch (e) {
    next(e);
  }
});

router.use("/api/v1/users", userRouter);
router.use("/api/v1/blogs", blogRouter);

module.exports = router;
