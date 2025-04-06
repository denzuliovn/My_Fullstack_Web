import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  {
    services {
      _id
      name
      price
      description
      image
    }
  }
`;

export const CATEGORY_BY_ID = gql`
  query GetServiceByID($id: ID!) {
    service(id: $id) {
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
    deleteService(id: $id)
  }
`;

export const UPDATE_BY_ID = gql`
  mutation updateByID($id: ID!, $input: ServiceInput!) {
    updateService(id: $id, input: $input) {
      _id
      name
      price
      description
      image
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateService($input: ServiceInput!) {
    createService(input: $input) {
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