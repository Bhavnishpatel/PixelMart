const Post = require("../models/Post.js");
const User = require("../models/User.js");

const createPost = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  if (authorAccountType == "buyer") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden Only Seller Can Make Post" });
  }
  const { title, author, price, image, publicId } = req.body;
  try {
    const post = await Post.create({
      title,
      author,
      price,
      image,
      publicId,
      authorId,
    });
    await User.findByIdAndUpdate(authorId, {
      $push: {
        uploads: post._id,
      },
    });
    return res
      .status(201)
      .json({ success: true, message: "Post Created Successfully", post });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message:error.message });
      
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts.length == 0)
      return res
        .status(404)
        .json({ success: false, Message: "Post Not Found" });
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, Message: "Internal Server Error" });
  }
};

const getMyPost = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  try {
    if (authorAccountType == "Buyer") {
      const { purchased } = await User.findById(authorId).populate("purchased");
      console.log(purchased);
      if (!purchased)
        return res
          .status(404)
          .json({ success: false, Message: "No Post Found" });
      return res.status(200).json({ success: true, data: purchased });
    } else {
      const { uploads } = await User.findById(authorId).populate("uploads");
      if (!uploads)
        return res
          .status(404)
          .json({ success: false, message: "No Post Found" });
      return res.status(200).json({ success: true, data: uploads });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, Message: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPost
};
