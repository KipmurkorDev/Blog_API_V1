const commentModel = require("../../Model/commentModel");
const { commentJoiSchema } = require("../../script/validators");
const blogModel = require("../../Model/blogModel");
const mongoose = require("mongoose");
// handle server errors
const handleServerError = (res, ex) => {
  console.error(ex);
  return res.status(500).json({ error: ex.message });
};

// get all comments for blog and update the view-count
const getAllCommentByBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const getBlog = await blogModel.find({ _id: blog_id });
    const getComments = await commentModel.find({ blog: blog_id });
    await blogModel.updateOne({ _id: blog_id }, { $inc: { viewsCount: 1 } });
    return res.status(200).json({ question: getBlog, comments: getComments });
  } catch (ex) {
    return handleServerError(res, ex);
  }
};

// create comment for a blog
const createComment = async (req, res) => {
  try {
    const user_info = res.locals.author;
    const blog = req.params.blog_id;
    const { error } = commentJoiSchema.validate({
      ...req.body,
      blog,
      user_info,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newComment = new commentModel({ ...req.body, blog, user_info });
    const results = await newComment.save();
    return res.status(201).json(results);
  } catch (ex) {
    return handleServerError(res, ex);
  }
};
// edit comment
const editComment = async (req, res) => {
  try {
    const { comment_id, blog_id } = req.params;
    const data = req.body;
    if (
      !mongoose.Types.ObjectId.isValid(blog_id) ||
      !mongoose.Types.ObjectId.isValid(comment_id)
    ) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const comment = await commentModel.findOne({
      _id: comment_id,
      blog: blog_id,
    });

    if (!comment) {
      return res.status(404).json({
        message: "The comment requested does not exist or is deleted",
      });
    }
    const user_info = res.locals.author;

    const { error } = commentJoiSchema.validate({
      ...req.body,
      blog: blog_id,
      user_info,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const response = await commentModel.updateOne(
      { blog: blog_id, _id: comment_id },
      { $set: { ...data } }
    );
    return res.status(200).json(response);
  } catch (ex) {
    return handleServerError(res, ex);
  }
};

// delete comment
const deleteComment = async (req, res) => {
  try {
    const { comment_id, blog_id } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(blog_id) ||
      !mongoose.Types.ObjectId.isValid(comment_id)
    ) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const comment = await commentModel.findOne({
      blog: blog_id,
      _id: comment_id,
    });

    if (!comment) {
      return res.status(404).json({
        message: "Not found: The comment doesn't  exist or already deleted",
      });
    }

    const response = await commentModel.deleteOne({
      blog: blog_id,
      _id: comment_id,
    });
    return res.status(200).json(response);
  } catch (ex) {
    return handleServerError(res, ex);
  }
};

module.exports = {
  createComment,
  editComment,
  deleteComment,
  getAllCommentByBlog,
};
