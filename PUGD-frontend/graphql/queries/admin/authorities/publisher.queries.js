import gql from 'graphql-tag';

const GET_PUBLISHER = gql`
query(
  $Id : String,
  $Name : String,
  $Address1 : String,
  $Address2 : String,
  $Post_code : String,
  $City : String,
  $Country : String,
  $Website : String,
  $note : String, 
){
publisher(
  id:$Id
  Name : $Name,
  Address1 : $Address1,
  Address2 : $Address2,
  Post_code : $Post_code,
  City : $City,
  Country : $Country,
  Website : $Website,
  note : $note
)
  {
    _id
    name
    address1
    address2
    post_code
    city
    country
    website
    supplier {
      _id
      name
    }
    note
    url_thumbnail
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
}
}
`;
const GET_PUBLISHER_ALL_FIELDS = gql`
 
query(
  $all_fields : String!,
){
publisher_all_fields(
  all_fields:$all_fields
)
  {
    _id
    name
    address1
    address2
    post_code
    city
    country
    website
    supplier
    note
    url_thumbnail
    linked_authorities
}
}

`;


module.exports = {
  GET_PUBLISHER,
  GET_PUBLISHER_ALL_FIELDS

}
