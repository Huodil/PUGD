import gql from 'graphql-tag';

const GET_STOPWORD = gql`
query(
  $Id:String,
  $Word:String,
  $Type:Int,
){
  stopword(id:$Id
  word:$Word
  type:$Type){
    _id
    type 
    word
  }
}
`;

module.exports = {
  GET_STOPWORD,
}
