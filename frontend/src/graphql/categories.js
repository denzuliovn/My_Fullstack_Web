import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  {
    categories {
      _id
      name
      price
      description
      image
    }
  }
`;

export const CATEGORY_BY_ID = gql`
  query GetCategoryByID($id: ID!) {
    category(id: $id) {
      _id
      name
      price
      description
      image
    }
  }
`;

export const DELETE_BY_ID = gql`
  mutation deleteByID($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const UPDATE_BY_ID = gql`
  mutation updateByID($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
      _id
      name
      price
      description
      image
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      _id
      name
      price
      description
      image
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      message
      data {
        jwt
      }
    }
  }
`;