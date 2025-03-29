// Models/user.js
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let String = Schema.Types.String;

export const UserSchema = new Schema(
  {
    username: String,
    password: String, // Lưu mật khẩu đã mã hóa
    role: {
      type: String,
      enum: ['user', 'admin'], // Giới hạn role là user hoặc admin
      default: 'user', // Mặc định là user
    },
  },
  {
    collection: 'users',
  }
);

export const User = mongoose.model('User', UserSchema);