// frontend/src/components/Service.jsx
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CATEGORY_BY_ID, DELETE_BY_ID } from "../graphql/services.js";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const Service = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: { id },
  });

  const [deleteService, { loading: deleteLoading }] = useMutation(DELETE_BY_ID, {
    onCompleted: () => {
      navigate("/");
      window.location.reload();
    },
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService({ variables: { id } });
      } catch (err) {
        console.error("Error deleting service:", err);
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <pre className="text-red-500">{error.message}</pre>;

  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager";

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Service Details</h2>
        <p className="text-gray-600"><strong>ID:</strong> {data.service._id}</p>
        <p className="text-gray-600"><strong>Name:</strong> {data.service.name}</p>
        <p className="text-gray-600"><strong>Price:</strong> {data.service.price}</p>
        <p className="text-gray-600"><strong>Description:</strong> {data.service.description}</p>
        {data.service.image && (
          <img
            src={`https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/img/${data.service.image}`}
            alt={data.service.name}
            className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto"
          />
        )}
        <div className="flex justify-between mt-6">
          {isAdmin && (
            <>
              <Link to={`/Service/edit/${id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition ${
                  deleteLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
          {isManager && (
            <Link to={`/Service/edit/${id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                Edit
              </button>
            </Link>
          )}
          <Link to={`/`}>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Service;