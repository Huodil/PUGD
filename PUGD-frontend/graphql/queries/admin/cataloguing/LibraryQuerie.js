import gql from 'graphql-tag';

const GET_LIBRARY = gql`
query($Id : String!){
  library(id : $Id){
    _id
    Name
    Address
  }
}
`;
const GET_LIBRARY_ALL_FIELDS = gql`
 
query($Name : String){
  libraries(Name : $Name){
    _id
    Name
    Address
  }
}
`;


module.exports = {
  GET_LIBRARY: GET_LIBRARY,
  GET_LIBRARY_ALL_FIELDS: GET_LIBRARY_ALL_FIELDS, 

}