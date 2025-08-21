import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import Like from "../models/Like.js";

const router = Router();

// Get like count for a post
router.get("/count/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const count = await Like.countDocuments({ postId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Toggle like/unlike for a post (requires authentication)
router.post("/:postId/toggle", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId || (req.user && req.user._id);
    const existing = await Like.findOne({ postId, userId });
    if (existing) {
      await existing.deleteOne();
      return res.json({ liked: false });
    } else {
      await Like.create({ postId, userId });
      return res.json({ liked: true });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
