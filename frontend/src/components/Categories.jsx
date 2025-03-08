import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY } from "../graphql/categories.js";
import { Link } from "react-router-dom";

function Categories() {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  
  return (
    <>
      <div>
        <h2> Category List</h2>
        <ul>
          {data.categories.map((Category) => (
            <li key={Category._id}>
              <Link to={`/Category/${Category._id}`}>{Category.name}</Link>
            </li>
          ))}
        </ul>

        <Link to={`/Categories/create`}> 
          <button style={{ marginRight: "10px", background: "Green", color: "white" }}>
            Create
          </button>
        </Link> <br />
      </div>
    </>
  )

}

export default Categories;
