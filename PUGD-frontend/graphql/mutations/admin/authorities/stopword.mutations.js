import gql from 'graphql-tag';

const INSERT_STOPWORD = gql`
mutation(
  $Word:String!,
  $Type:Int,
){
  
  InsertStopword(
    word:$Word,
  type:$Type)
}
`;

const UPDATE_STOPWORD = gql`
mutation(
  $Id:String!,
  $Word:String,
  $Type:Int,
){
  
  UpdateStopword(
    Id:$Id,
    word:$Word,
  type:$Type)
}
`;
const DELETE_STOPWORD = gql`
mutation(
  $Id:String!
){
  DeleteStopword(
    _id:$Id)
}
`;


module.exports = {
  INSERT_STOPWORD,
  UPDATE_STOPWORD,
  DELETE_STOPWORD,
}
