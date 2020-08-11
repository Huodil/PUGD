import gql from 'graphql-tag';

const INSERT_SYNONYM = gql`
mutation(
  $Word:String!,
  $Lead_To:[ID],
){
  
  InsertSynonym(
    word:$Word,
  leads_to:$Lead_To)
}
`;

const UPDATE_SYNONYM = gql`
mutation(
  $Id:String!,
  $Word:String,
  $Lead_To:[ID],
){
  
  UpdateSynonym(
    Id:$Id,
    word:$Word,
  leads_to:$Lead_To)
}
`;
const DELETE_SYNONYM = gql`
mutation(
  $Id:String!
){
  DeleteSynonym(
    _id:$Id)
}
`;


module.exports = {
  INSERT_SYNONYM,
  UPDATE_SYNONYM,
  DELETE_SYNONYM,
}
