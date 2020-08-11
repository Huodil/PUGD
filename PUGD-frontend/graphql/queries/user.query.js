import gql from 'graphql-tag';

 
const LOGIN_QUERY = gql`
  query($username : String!,$password : String!){
    login(username:$username,password:$password)
    {
      token
    }
  }

`;

module.exports = { 
  LOGIN_QUERY,
}
