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
    return res.status(500).json({ success: false, message: error.message });
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

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne(id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    const { authorId } = post;
    await User.findByIdAndUpdate(authorId, {
      $pull: { uploads: id },
    });

    return res
      .status(200)
      .json({ success: true, message: "Post Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const searchPost = async (req, res) => {
  const { search } = req.query;
  try {
    const posts = await Post.find({ title: { $regex: search, $options: "i" } });
    if (posts.length == 0)
      return res.status(404).json({ success: false, message: "No Post Found" });
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const addToFavourites = async (req, res) => {
  const { authorId } = req.id;
  const { postId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(authorId, {
      $push: {
        favoutrites: postId,
      },
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    return res
      .status(200)
      .json({ success: true, message: "Post Added to Favourites" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const removeToFavourites = async (req, res) => {
  const { authorId } = req.id;
  const { postId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(authorId, {
      $pull: {
        favoutrites: postId,
      },
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    return res
      .status(200)
      .json({ success: true, message: "Post Removed From Favourites" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getFavourites = async (req, res) => {
  const authorId = req.id;
  try {
    const { favoutrites } = await User.findById(authorId).populate(
      "favourites"
    );
    if (!favoutrites)
      return res
        .status(404)
        .json({ success: false, message: "No Favourites found" });
    return res.status(200).json({ success: true, data: favoutrites });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getPostByRange = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  let data;
  try {
    if (authorAccountType == "buyer") {
      const { purchased } = await User.findById(authorId).populate("purchased");
      data = purchased;
    } else {
      const { uploads } = await User.findById(authorId).populate("uploads");
      data = uploads;
    }
    if (!data) return res.json({ success: false, message: "No Post Found" });
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const postsThisYear = data.filter(
      (post) => new Date(post.createdAt) >= startOfYear
    );
    const postsThisMonth = postsThisYear.filter(
      (post) => new Date(post.createdAt) >= startOfMonth
    );
    const postsThisWeek = postsThisMonth.filter(
      (post) => new Date(post.createdAt) >= startOfWeek
    );

    return res.status(200).json({
      success: true,
      data: {
        tillNow: data,
        thisYear: postsThisYear,
        thisMonth: postsThisMonth,
        thisWeek: postsThisWeek,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPost,
  deletePost,
  searchPost,
  addToFavourites,
  removeToFavourites,
  getFavourites,
  getPostByRange,
};
