import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now }
});

const Comment = model('Comment', commentSchema);
export default Comment;
