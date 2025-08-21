import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import Comment from "../models/Comment.js";

const router = Router();

// Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a comment (requires authentication)
router.post("/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Missing text" });
    }
    const comment = await Comment.create({
      postId,
      userId: req.userId || (req.user && req.user._id),
      text,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
