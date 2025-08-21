// server/models/User.js
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type:String, required:true },
  email:{ type:String, required:true, unique:true, index:true },
  passwordHash:String,
  provider:{ type:String, enum:['local','google'], default:'local' },
  createdAt:{ type:Date, default:Date.now }
});
module.exports = mongoose.model('User', schema);
