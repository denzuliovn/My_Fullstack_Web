import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const CATEGORY_BY_ID = gql`
  query GetCategoryByID($id: ID!) {
    category(id: $id) {
      _id
      name
    }
  }
`;

export const DELETE_BY_ID = gql`
  mutation deleteByID($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const UPDATE_BY_ID = gql`
  mutation updateByID($id: ID!, $input: CategoryInput!){
    updateCategory(id: $id, input: $input){
      _id
      name
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      _id
      name
    }
  }
`;

