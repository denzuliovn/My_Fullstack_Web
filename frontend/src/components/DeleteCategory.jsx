import { useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CATEGORY_BY_ID, DELETE_BY_ID } from "../graphql/categories.js";

// Component để xóa một danh mục
const DeleteCategory = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Hook để điều hướng giữa các trang

  // Truy vấn GraphQL để lấy thông tin danh mục theo ID
  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: { id }, // Truyền ID vào truy vấn
  });

  // Mutation để xóa danh mục theo ID
  const [deleteCategory] = useMutation(DELETE_BY_ID);

  // Hàm xử lý xóa danh mục
  const handleDelete = async () => {
    console.log("HandleDelete", id); // Kiểm tra ID có hợp lệ không
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory({
          variables: { id },
        });

        console.log("Category deleted successfully");

        // Sử dụng setTimeout để đảm bảo navigate và reload hoạt động đúng
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 500); // Đợi 0.5 giây để tránh xung đột giữa navigate và reload
      } catch (err) {
        console.error("Error deleting category:", err); // In lỗi chi tiết
      }
    }
  };

  // Kiểm tra trạng thái tải dữ liệu
  if (loading) return "Loading..."; // Hiển thị "Loading..." nếu đang tải dữ liệu
  if (error) return <pre>{error.message}</pre>; // Hiển thị lỗi nếu có

  return (
    <div>
      {/* Hiển thị thông tin danh mục */}
      <p>
        <strong>ID:</strong> {data.category._id}
      </p>
      <p>
        <strong>Name:</strong> {data.category.name}
      </p>

      {/* Nút Delete với sự kiện onClick gọi handleDelete */}
      <button
        onClick={handleDelete}
        style={{ background: "red", color: "white", marginRight: "10px" }}
      >
        Delete
      </button>

      {/* Link đến trang chỉnh sửa danh mục */}
      <Link to={`/category/edit/${id}`}>
        <button style={{ background: "blue", color: "white" }}>Edit</button>
      </Link>
    </div>
  );
};

export default DeleteCategory; // Xuất component để sử dụng trong ứng dụng
