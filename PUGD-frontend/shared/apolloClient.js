import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

const GRAPHQL_URL =  process.env.MANGO_URI; 

let token =""
if(process.browser)
{
  token = localStorage.getItem('token');
}

    
const httpLink = new HttpLink({ 
  uri: GRAPHQL_URL ,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  }, 
  fetch
}); 


export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link:httpLink,
    cache: new InMemoryCache().restore(initialState),
  })
}
