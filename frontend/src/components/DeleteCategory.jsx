import { useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CATEGORY_BY_ID, DELETE_BY_ID } from "../graphql/categories.js";

const DeleteCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: { id },
  });

  const [deleteCategory] = useMutation(DELETE_BY_ID);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory({ variables: { id } });
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 500);
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <pre className="text-red-500">{error.message}</pre>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category Details</h2>
        <p className="text-gray-600"><strong>ID:</strong> {data.category._id}</p>
        <p className="text-gray-600 mb-4"><strong>Name:</strong> {data.category.name}</p>
        
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Delete
          </button>
          <Link to={`/category/edit/${id}`}>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
