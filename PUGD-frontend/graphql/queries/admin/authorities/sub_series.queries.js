import gql from 'graphql-tag';

const GET_SUB_SERIES = gql`
query(
  $Name: String,
  $Website: String,
  $Comment: String,
  $Url_thumbnail: String, 
  $id: String,
  $Issn: String,
  $Publisher: String,
  $Parent_series: String,
  $Linked_authorities: [String],
  ){
    sub_series(
    Name: $Name,
    Website: $Website,
    Comment: $Comment,
    Url_thumbnail: $Url_thumbnail,
    Id: $id,
    Issn: $Issn,
    Publisher: $Publisher,
    Parent_series: $Parent_series,
    Linked_authorities: $Linked_authorities,
  )
  {
 
 _id
 comment
 issn
parent_series {
 _id
 comment
 issn
 publisher
 title
 url_thumbnail
 website
}
linked_authorities {
_id
comment
end
linked_authority_id
linked_authority_type
linktype
root_authority_id
root_authority_type
start
}
 publisher {
   _id
   address1
   address2
   city
   country
   name
   note
   post_code
   supplier
   url_thumbnail
   website
 }
 name
 url_thumbnail
 website

}
}
`;

const GET_SUB_SERIES_ALL_FIELDS = gql`
query($All_fields: String!){
  sub_series_all_fields(all_fields:$All_fields){
    
 _id
 comment
 issn
parent_series  
linked_authorities 
 publisher  
 name
 url_thumbnail
 website

}
   
}
`;
module.exports = {
  GET_SUB_SERIES,
  GET_SUB_SERIES_ALL_FIELDS

}
