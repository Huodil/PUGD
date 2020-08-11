import gql from 'graphql-tag';

const GET_LANGUAGE = gql`
query($Id :           String!){
  language(id :           $Id ){
    _id
    Value
  }
}
`;
const GET_LANGUAGE_ALL_FIELDS = gql`
 
query($Value : String){
  languages(Value : $Value){
    _id
    Value
  }
}
`;


module.exports = {
  GET_LANGUAGE: GET_LANGUAGE,
  GET_LANGUAGE_ALL_FIELDS: GET_LANGUAGE_ALL_FIELDS, 

}