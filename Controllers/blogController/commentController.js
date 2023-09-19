const commentModel = require("../../Model/commentModel");
const { isEmpty } = require("../../script/helper");

const getAllCommentByBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;
    const getComments = await commentModel.find({ blog: blog_id });
    return res.status(200).json(getComments);
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: ex.message });
  }
};

const createComment = async (req, res) => {
  try {
    const user_info = res.locals.author;
    const blog = req.params.blog_id;
    if (isEmpty(req.body))
      return res.json({ message: "The body should not be empty" });
    const newComment = new commentModel({ ...req.body, blog, user_info });
    const results = await newComment.save();
    return res.status(200).json(results);
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: ex.message });
  }
};
const editComment = async (req, res) => {
  try {
    const { comment_id, blog_id } = req.params;
    const data = req.body;
    const comment = await commentModel.findOne({
      _id: comment_id,
      blog: blog_id,
    });
    if (!comment)
      return res.json({
        message: "The comment requested does not exist or deleted",
      });
    if (isEmpty(req.body))
      return res.json({ message: "The body should not be empty" });
    const response = await commentModel.updateOne(
      { blog: blog_id, _id: comment_id },
      { $set: { ...data } }
    );
    return res.status(200).json(response);
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: ex.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comment_id, blog_id } = req.params;
    const comment = commentModel.findOne({ blog: blog_id, _id: comment_id });

    if (!comment)
      return res.json({ message: "The comment requested is deleted" });
    const response = await commentModel.deleteOne({
      blog: blog_id,
      _id: comment_id,
    });
    return res.status(200).json(response);
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: ex.message });
  }
};

module.exports = {
  createComment,
  editComment,
  deleteComment,
  getAllCommentByBlog,
};
