import gql from 'graphql-tag';

const INSERT_CATEGORY = gql`
mutation(
  $Name: String,
  $Record : [String],
  $Comment: String,
  $See: String,
  $See_also : [String],
  $Authority_number: Int,
  $URL_thumbnail: String,
  $Linked_authorities: [AuthorityLinkInputType], 
  $Scope_note:String,
  $Broader_term: String 
)
{
 InsertCategory (
	Name:$Name,
  Record : $Record,
  Comment: $Comment,
  See: $See,
  See_also : $See_also,
  Authority_number: $Authority_number,
  URL_thumbnail: $URL_thumbnail,
  Linked_authorities: $Linked_authorities, 
  Scope_note:$Scope_note,
  Broader_term: $Broader_term
)
}
`;
 const UPDATE_CATEGORY = gql`
 
 mutation(
  $Id: String!,
  $Name: String,
  $Record : [String],
  $Comment: String,
  $See: String,
  $See_also : [String],
  $Authority_number: Int,
  $URL_thumbnail: String,
  $Linked_authorities: [AuthorityLinkInputType], 
  $Scope_note:String,
  $Broader_term: String 
)
{
 UpdateCategory (
  Id:$Id,
	Name:$Name,
  Record : $Record,
  Comment: $Comment,
  See: $See,
  See_also : $See_also,
  Authority_number: $Authority_number,
  URL_thumbnail: $URL_thumbnail,
  Linked_authorities: $Linked_authorities, 
  Scope_note:$Scope_note,
  Broader_term: $Broader_term
)
}
`;
const DELETE_CATEGORY = gql`
mutation($Id:String!){
  DeleteCategory(_id:$Id)
}
`;

module.exports = {
    INSERT_CATEGORY, 
    UPDATE_CATEGORY, 
    DELETE_CATEGORY
}
