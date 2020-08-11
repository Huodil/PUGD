import gql from 'graphql-tag';

const INSERT_PUBLISHER = gql`
mutation(
  $note :String,
  $Name: String,
  $Address1: String,
  $Country: String,
  $Address2: String,
  $Post_code: String,
  $City: String,
  $Website: String,
  $url_thumbnail: String,
  $Supplier :String,
  $Linked_authorities : [AuthorityLinkInputType],
){

InsertPublisher(
  Supplier : $Supplier,
  note : $note,
  Name: $Name,
  Address1: $Address1,
  Country: $Country,
  Address2: $Address2,
  Post_code: $Post_code,
  City: $City,
  Website: $Website,
  url_thumbnail: $url_thumbnail,
  Linked_authorities: $Linked_authorities,
)
}

`;

const UPDATE_PUBLISHER = gql`
mutation(
  $ID :String!,
  $Supplier :String,
  $note :String,
  $Name: String,
  $Address1: String,
  $Country: String,
  $Address2: String,
  $Post_code: String,
  $City: String,
  $url_thumbnail: String,
  $Linked_authorities : [AuthorityLinkInputType],
){

UpdatePublisher(
  _id:$ID,
  Supplier : $Supplier,
  note : $note,
  Name: $Name,
  Address1: $Address1,
  Country: $Country,
  Address2: $Address2,
  Post_code: $Post_code,
  City: $City,
  url_thumbnail: $url_thumbnail,
  Linked_authorities: $Linked_authorities,
)
}
`;

const DELETE_PUBLISHER = gql`
mutation(
  $Id :String!,
){

DeletePublisher(
  _id:$Id,
)
}
`;

module.exports = {
  INSERT_PUBLISHER,
  UPDATE_PUBLISHER,
  DELETE_PUBLISHER
}
