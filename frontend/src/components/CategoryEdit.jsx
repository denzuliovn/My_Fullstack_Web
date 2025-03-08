import { useState } from "react";
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

  // Local state to manage the updated category name
  const [newCategoryName, setNewCategoryName] = useState(data?.category?.name || "");

  const handleUpdate = async () => {
    const input = { name: newCategoryName };
    try {
      await updateCategory({ variables: { id, input } });
      navigate("/"); // Navigate back to the root (or any other page you want)
      window.location.reload();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleCancel = () => {
    navigate(`/category/${id}`); // Navigate back to the category detail page
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>Edit Category</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="categoryName">Category Name: </label>
          <input
            type="text"
            id="categoryName"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleUpdate}>
          OK
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CategoryEdit;
