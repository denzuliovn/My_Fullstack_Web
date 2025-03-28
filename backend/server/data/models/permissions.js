// permissions.js
import { shield, rule, and, allow } from 'graphql-shield';

// Quy tắc kiểm tra vai trò
const isAuthenticated = rule()(async (parent, args, ctx) => {
  return ctx.user !== null;
});

const isAdmin = rule()(async (parent, args, ctx) => {
  return ctx.user?.role === 'admin';
});

// Quyền truy cập cho các mutation và query
export const permissions = shield({
  Query: {
    categories: allow, // Ai cũng xem được danh sách
    category: allow,   // Ai cũng xem được chi tiết
  },
  Mutation: {
    createCategory: and(isAuthenticated, isAdmin), // Chỉ admin tạo được
    updateCategory: and(isAuthenticated, isAdmin), // Chỉ admin sửa được
    deleteCategory: and(isAuthenticated, isAdmin), // Chỉ admin xóa được
    login: allow, // Ai cũng đăng nhập được
    upload: and(isAuthenticated, isAdmin), // Chỉ admin upload ảnh
  },
});