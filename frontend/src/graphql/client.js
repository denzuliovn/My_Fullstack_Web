// src/graphql/client.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://urban-space-disco-r9gxgw544wwhr67-4000.app.github.dev/", // URL của server GraphQL
  cache: new InMemoryCache(),
});