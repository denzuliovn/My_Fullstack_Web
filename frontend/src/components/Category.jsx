// src/components/Category.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CATEGORY_BY_ID, DELETE_BY_ID } from "../graphql/categories.js";
import "tailwindcss";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(CATEGORY_BY_ID, { variables: { id } });
  const { user } = useContext(AuthContext);

  const [deleteCategory] = useMutation(DELETE_BY_ID);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory({ variables: { id } });
      navigate("/");
      window.location.reload();
    }
  };

  if (loading) return <p className="text-center text-2xl font-semibold">Loading...</p>;
  if (error) return <pre className="text-red-500 text-center">{error.message}</pre>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white shadow-2xl rounded-xl text-center transform scale-110">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Service Details</h1>
        {data.category.image && (
          <img
            src={`https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/img/${data.category.image}`}
            alt={data.category.name}
            className="w-64 h-64 object-cover rounded-lg mx-auto mb-8 shadow-md"
          />
        )}
        <p className="text-xl text-gray-700 mb-4">
          <strong className="font-semibold">ID:</strong> {data.category._id}
        </p>
        <p className="text-xl text-gray-700 mb-4">
          <strong className="font-semibold">Name:</strong> {data.category.name}
        </p>
        <p className="text-xl text-gray-700 mb-4">
          <strong className="font-semibold">Price:</strong> ${data.category.price}
        </p>
        <p className="text-xl text-gray-700 mb-8">
          <strong className="font-semibold">Description:</strong> {data.category.description}
        </p>

        <div className="flex justify-center gap-6">
          {user?.role === "admin" && (
            <>
              <Link to={`/Category/edit/${id}`}>
                <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </>
          )}
          <Link to={`/`}>
            <button className="px-6 py-3 bg-gray-700 text-white text-lg font-semibold rounded-lg hover:bg-gray-900 transition">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;