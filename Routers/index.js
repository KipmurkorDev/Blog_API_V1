const authorRouter = require("./userRouter/userRouter");
const blogRouter = require("./blogRouter/blogRouter");
const commentRouter = require("./blogRouter/commentRouter");
const express = require("express");
const router = express.Router();

router.use("/user", authorRouter);
router.use("blog", blogRouter);
router.use("/comment", commentRouter);
module.exports = router;
