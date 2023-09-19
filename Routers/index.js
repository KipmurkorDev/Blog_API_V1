const authorRouter = require("./userRouter/userRouter");
const blogRouter = require("./blogRouter/blogRouter");
const commentRouter = require("./commentRouter/commentRouter");
const express = require("express");
const router = express.Router();

router.use("/user", authorRouter);
router.use("/blogs", blogRouter);
router.use("/comments", commentRouter);
module.exports = router;
