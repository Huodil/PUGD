import gql from 'graphql-tag';

const REGISTER_MUTATION = gql`
mutation($username : String!,$password : String!){
  register(username:$username,password:$password)
}

`;
 

module.exports = {
  REGISTER_MUTATION, 
}
