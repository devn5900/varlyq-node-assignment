const { PostModel } = require("../models/Post.model");

const getPost = async (req, res) => {
  try {
    const data = await PostModel.find({}).populate('createdBy', 'name email') 
    .populate({
      path: 'comments',
      populate: [
        { path: 'sentBy', select: 'name' }, 
        { path: 'liked', select: 'name' },   
      ],
    })
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", code: "9" });
  }
};

const createPost = async (req, res) => {
  const { message, userId } = req.body;
  const payload = {
    createdBy: userId,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    message,
    comments: [],
  };
  try {
    const data = new PostModel(payload);
    const isSaved = await data.save();
    return res.status(201).json({ data: isSaved });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", code: "27" });
  }
};
const deletePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    await PostModel.findOneAndDelete({ _id: postId, createdBy: userId });
    return res.status(200).json({ msg: "Post Deleted !" });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", code: "38" });
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { userId, message } = req.body;
  const payload = {};
  const condition = { _id: postId };
  if (message) {
    payload.message = message;
    condition.createdBy = userId;
  }
  try {
    const data = await PostModel.findOneAndUpdate(condition, payload, {
      new: true,
    });
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", code: "59" });
  }
};

const commentOnPost = async (req, res) => {
  const { postId } = req.params;
  const { userId, comments } = req.body;
  try {
    const data = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: comments },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", code: "72" });
  }
};

const updateComments = async (req, res) => {
  const { postId, commentId,data } = req.body;
  const { userId } = req.body;

  try {
    const data = await PostModel.findOneAndUpdate(
      { _id: postId, "comments._id": commentId },
      {$set:data},
      {new:true}
    );
    return res.status(200).json({data});
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", code: "93" });
  }
};
module.exports = {
  getPost,
  createPost,
  deletePost,
  updatePost,
  commentOnPost,
  updateComments,
};
