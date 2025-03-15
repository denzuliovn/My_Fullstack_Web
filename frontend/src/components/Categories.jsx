import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY } from "../graphql/categories.js";
import { Link } from "react-router-dom";
import "tailwindcss";

function Categories() {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <pre className="text-red-500">{error.message}</pre>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Category List</h2>
      <ul className="space-y-2">
        {data.categories.map((Category) => (
          <li key={Category._id} className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition">
            <Link to={`/Category/${Category._id}`} className="text-blue-600 font-semibold">{Category.name}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/Categories/create`}>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition">
          Create
        </button>
      </Link>
    </div>
  );
}

export default Categories;
