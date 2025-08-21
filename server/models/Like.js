import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
}, { timestamps: true });

likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);
export default Like;
