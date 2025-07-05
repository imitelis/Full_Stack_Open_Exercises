import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import App from "./App";
import "./index.css";

const REACT_APP_GRAPHQL_HTTP = process.env.REACT_APP_GRAPHQL_HTTP
const REACT_APP_GRAPHQL_WS = process.env.REACT_APP_GRAPHQL_WS

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("loggedLibraryToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: REACT_APP_GRAPHQL_HTTP,
});

const wsLink = new GraphQLWsLink(createClient({ url: REACT_APP_GRAPHQL_WS }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
);
