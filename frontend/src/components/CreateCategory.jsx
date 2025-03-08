import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { CREATE_CATEGORY } from "../graphql/categories.js";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      navigate("/");
      window.location.reload();
    }, // Navigate to homepage after creation
  });

  const handleCreate = async (e) => {
    e.preventDefault();
  
    if (!categoryName.trim()) {
      alert("Category name cannot be empty!");
      return;
    }
  
    try {
      await createCategory({
        variables: { input: { name: categoryName } },
      });
  
      console.log("Category created successfully");
  
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };
  

  return (
    <div>
      <h1>Create New Category</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="categoryName">Category Name: </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <Link to={`/`}>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default CreateCategory;
