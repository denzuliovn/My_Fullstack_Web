// backend/server/data/models/permissions.js
import { shield, rule, and, allow } from "graphql-shield";

// Quy tắc kiểm tra vai trò
const isAuthenticated = rule()(async (parent, args, ctx) => {
  return ctx.user !== null;
});

const isAdmin = rule()(async (parent, args, ctx) => {
  return ctx.user?.role === "admin";
});

const isManager = rule()(async (parent, args, ctx) => {
  return ctx.user?.role === "manager";
});

// Quyền truy cập cho các mutation và query
export const permissions = shield({
  Query: {
    services: allow, // Ai cũng xem được danh sách
    service: allow,  // Ai cũng xem được chi tiết
  },
  Mutation: {
    createService: and(isAuthenticated, isAdmin), // Chỉ admin tạo được
    updateService: and(isAuthenticated, isAdmin), // Chỉ admin sửa toàn bộ
    updateServiceByManager: and(isAuthenticated, isManager), // Manager chỉ sửa name và description
    deleteService: and(isAuthenticated, isAdmin), // Chỉ admin xóa được
    login: allow, // Ai cũng đăng nhập được
    upload: and(isAuthenticated, isAdmin), // Chỉ admin upload ảnh
  },
});