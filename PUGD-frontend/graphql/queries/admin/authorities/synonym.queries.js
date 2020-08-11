import gql from 'graphql-tag';

const GET_SYNONYM = gql`
query(
  $Id:String,
  $Word:String,
  $Lead_To:[ID],
){
  synonym(id:$Id
  word:$Word
  leads_to:$Lead_To){
    _id
    leads_to {
      _id
      word
      leads_to
    }
    word
  }
}
`;


module.exports = {
  GET_SYNONYM,
}
