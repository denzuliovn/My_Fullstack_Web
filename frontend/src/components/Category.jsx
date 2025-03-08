import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CATEGORY_BY_ID, DELETE_BY_ID } from "../graphql/categories.js";

const Category = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: {
      id,
    },
  });

  // if (loading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>;

  const [DeleteCategory] = useMutation(DELETE_BY_ID, {
    variables: {
      id,
    },
  });

  const handleDelete = async () => {
    console.log("Handledelete");
    if (window.confirm("Are you sure you want to delete this category?")) {
      await DeleteCategory();
      Navigate("/");
      window.location.reload();
    }
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>Category Details</h1>
      <p>
        <strong>ID:</strong> {data.category._id}
      </p>
      <p>
        <strong>Name:</strong> {data.category.name}
      </p>

      {/* Nút Edit */}
      <Link to={`/Category/edit/${id}`}>
        <button
          style={{ marginRight: "10px", background: "blue", color: "white" }}
        >
          Edit
        </button>
      </Link>

      {/* Nút Delete */}
      <button
        onClick={handleDelete}
        style={{ background: "red", color: "white", marginRight: "10px"  }}
      >
        Delete
      </button>

      <Link to={`/`}>
        <button
          style={{ marginRight: "10px", background: "black", color: "white" }}
        >
          Back
        </button>
      </Link>
    </div>
  );
};

export default Category;
