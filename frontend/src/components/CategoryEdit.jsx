import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CATEGORY_BY_ID, UPDATE_BY_ID } from "../graphql/categories.js";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: { id },
  });

  const [updateCategory] = useMutation(UPDATE_BY_ID);

  const [category, setCategory] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    if (data?.category) {
      setCategory({
        name: data.category.name || "",
        price: data.category.price || "",
        description: data.category.description || "",
      });
    }
  }, [data]);

  const handleUpdate = async () => {
    const input = { ...category };
    try {
      await updateCategory({ variables: { id, input } });
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleCancel = () => {
    navigate(`/category/${id}`);
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Service</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600 mb-1">Service Name:</label>
            <input
              type="text"
              id="name"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-600 mb-1">Price:</label>
            <input
              type="text"
              id="price"
              value={category.price}
              onChange={(e) => setCategory({ ...category, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-600 mb-1">Description:</label>
            <textarea
              id="description"
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition w-full"
          >
            OK
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition w-full"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryEdit;
