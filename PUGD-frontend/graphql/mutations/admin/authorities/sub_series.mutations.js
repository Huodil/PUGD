import gql from 'graphql-tag';

const INSERT_SUB_SERIES = gql`
mutation(
  $Website: String,
  $Comment: String,
  $Url_thumbnail: String,
  $Linked_authorities: [AuthorityLinkInputType],
  $Name: String,
  $Issn: String,
  $Publisher: String,
  $Parent_series: String
){

InsertSubSeries(
  Website: $Website ,
  Comment: $Comment ,
  Url_thumbnail: $Url_thumbnail ,
  Linked_authorities: $Linked_authorities ,
  Name: $Name ,
  Issn: $Issn ,
  Publisher: $Publisher ,
  Parent_series: $Parent_series 
)
}
`;

const UPDATE_SUB_SERIES = gql`
mutation(
  $ID :String!,
  $Website: String,
  $Comment: String,
  $Url_thumbnail: String,
  $Linked_authorities: [AuthorityLinkInputType],
  $Name: String,
  $Issn: String,
  $Publisher: String,
  $Parent_series: String
){

UpdateSubSeries(
  _id:$ID,
  Website: $Website ,
  Comment: $Comment ,
  Url_thumbnail: $Url_thumbnail ,
  Linked_authorities: $Linked_authorities ,
  Name: $Name ,
  Issn: $Issn ,
  Publisher: $Publisher ,
  Parent_series: $Parent_series 
)
}
`;

const DELETE_SUB_SERIES = gql`
mutation(
  $Id :String!,
){

DeleteSubSeries(
  _id:$Id,
)
}
`;

module.exports = {
  INSERT_SUB_SERIES,
  UPDATE_SUB_SERIES,
  DELETE_SUB_SERIES
}
