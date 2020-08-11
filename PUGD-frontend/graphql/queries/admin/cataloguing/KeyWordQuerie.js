import gql from 'graphql-tag';

const GET_KEYWORD = gql`
query( $Id : String!){
    keyword(id:$Id){
    _id
    Word
    Lang
  }
}
`;
const GET_KEYWORD_ALL_FIELDS = gql`
 
query($Word: String){
    keywords(Word:$Word){
    _id
    Word
    Lang
  }
}
`;


module.exports = {
  GET_KEYWORD: GET_KEYWORD,
  GET_KEYWORD_ALL_FIELDS: GET_KEYWORD_ALL_FIELDS, 

}