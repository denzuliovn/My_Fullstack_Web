import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { CREATE_CATEGORY } from "../graphql/categories.js";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "", price: "", description: "" });

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      navigate("/");
      window.location.reload();
    },
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!category.name.trim() || !category.price.trim() || !category.description.trim()) {
      alert("All fields are required!");
      return;
    }
    try {
      await createCategory({ variables: { input: { ...category } } });
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Service</h2>
        <form onSubmit={handleCreate} className="space-y-4">
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
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition w-full"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
        <Link to={`/`}>
          <button className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateCategory;
