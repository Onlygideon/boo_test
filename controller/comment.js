const Comment = require("../models/Comment.js");
const User = require("../models/User.js");

module.exports = {
  async createComment(req, res) {
    try {
      const commentDetails = req.body;

      const checkUser = await User.findById(commentDetails.userId);
      if (!checkUser) {
        return res.status(400).json({
          status: false,
          message: "User not found",
        });
      }

      const createComment = await Comment.create(commentDetails);
      if (createComment) {
        return res.status(201).json({
          status: true,
          message: "Commennt created",
          data: createComment,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Comment not created",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: `Internal server error occured`,
      });
    }
  },

  async fetchComments(req, res) {
    try {
      const userId = req.params.userId;
      if (!userId) {
        res.status(400).json({
          status: false,
          message: "User ID required",
        });
      }

      const checkUser = await User.findById(userId);
      if (!checkUser) {
        return res.status(400).json({
          status: false,
          message: "Invalid userId",
        });
      }

      let sort = "";
      const { sortBy } = req.query;
      if (typeof sortBy === "string") {
        sort = sortBy;
      } else {
        sort = "new";
      }

      const comments = await Comment.find({ userId }).sort({
        createdAt: sort == "old" ? 1 : -1,
      });
      if (comments) {
        return res.status(200).json({
          status: true,
          message: "Comment fetched successfully",
          data: comments,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Comment not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        message: `Internal server error occured`,
      });
    }
  },

  async likeComment(req, res) {
    try {
      const commentDetails = req.body;

      const checkUser = await User.findById(commentDetails.userId);
      if (!checkUser) {
        return res.status(400).json({
          status: false,
          message: "Invalid userId",
        });
      }

      const checkComment = await Comment.findById(commentDetails.commentId);
      if (!checkComment) {
        return res.status(400).json({
          status: false,
          message: "Invalid commentId",
        });
      }

      const likeComment = await Comment.findByIdAndUpdate(
        commentDetails.commentId,
        {
          $addToSet: {
            likedBy: commentDetails.userId,
          },
          $pull: {
            unlikedBy: commentDetails.userId,
          },
        },
        {
          new: true,
        }
      );

      if (likeComment) {
        return res.status(200).json({
          status: true,
          message: "Commennt liked",
          data: likeComment,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Comment not liked",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        message: `Internal server error occured`,
      });
    }
  },

  async unlikeComment(req, res) {
    try {
      const commentDetails = req.body;

      const checkUser = await User.findById(commentDetails.userId);
      if (!checkUser) {
        return res.status(400).json({
          status: false,
          message: "Invalid userId",
        });
      }

      const checkComment = await Comment.findById(commentDetails.commentId);
      if (!checkComment) {
        return res.status(400).json({
          status: false,
          message: "Invalid commentId",
        });
      }

      const unlikeComment = await Comment.findByIdAndUpdate(
        commentDetails.commentId,
        {
          $pull: {
            likedBy: commentDetails.userId,
          },
          $addToSet: {
            unlikedBy: commentDetails.userId,
          },
        },
        {
          new: true,
        }
      );

      if (unlikeComment) {
        return res.status(200).json({
          status: true,
          message: "Commennt unliked",
          data: unlikeComment,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Comment not unliked",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        message: `Internal server error occured`,
      });
    }
  },
};
