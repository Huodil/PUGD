/* eslint-disable no-undef */
import { withApollo } from "next-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: process.env.MANGO_URI,
  cache: new InMemoryCache(),
});

export default withApollo(apolloClient);
