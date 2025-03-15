import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CATEGORY_BY_ID, DELETE_BY_ID } from "../graphql/categories.js";
import "tailwindcss";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: {
      id,
    },
  });

  const [deleteCategory] = useMutation(DELETE_BY_ID);

  const handleDelete = async () => {
    console.log("Handledelete");
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory({ variables: { id } });
      navigate("/");
      window.location.reload();
    }
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Service Details</h1>
      <p className="text-gray-700">
        <strong>ID:</strong> {data.category._id}
      </p>
      <p className="text-gray-700">
        <strong>Name:</strong> {data.category.name}
      </p>
      <p className="text-gray-700">
        <strong>Price:</strong> {data.category.price}
      </p>
      <p className="text-gray-700">
        <strong>Description:</strong> {data.category.description}
      </p>

      <div className="mt-4 flex space-x-2">
        <Link to={`/Category/edit/${id}`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Edit</button>
        </Link>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>

        <Link to={`/`}>
          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Category;
