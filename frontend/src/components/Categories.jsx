import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY } from "../graphql/categories.js";
import { Link } from "react-router-dom";
import "tailwindcss";

function Categories() {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <pre className="text-red-500">{error.message}</pre>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.categories.map((category) => (
          <Link
            to={`/Category/${category._id}`}
            key={category._id}
            className="block p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center">
              {category.image ? (
                <img
                  src={`https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/img/${category.image}`}
                  alt={category.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <h3 className="text-blue-600 font-semibold text-lg text-center">{category.name}</h3>
              <p className="text-gray-600 text-sm mt-2">Price: ${category.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to={`/Categories/create`}>
          <button className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition">
            Create New Category
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Categories;