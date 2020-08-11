import gql from 'graphql-tag';

const GET_SERIES = gql`
query(
  $Comment: String ,
  $id: String ,
  $Title: String ,
  $Issn: String ,
  $Website: String ,
  $Url_thumbnail: String ,
  $Publisher: String ,
  $Linked_authorities: [String],
  ){
  series(
    Comment : $Comment,
    id : $id,
    Title : $Title,
    Issn : $Issn,
    Website : $Website,
    Url_thumbnail : $Url_thumbnail,
    Publisher : $Publisher,
    Linked_authorities : $Linked_authorities,
  )
    {
 
      _id
      comment
      issn
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
 
        name
       
      }
      title
      url_thumbnail
      website
 
  }
  }
`;
const GET_SERIES_ALL_FIELDS = gql`
 
query(
  $all_fields : String!,
){
  series_all_fields(
  all_fields:$all_fields
)
  {
    _id
    comment
    issn
    linked_authorities
    publisher
    title
    url_thumbnail
    website
}
}

`;


module.exports = {
  GET_SERIES,
  GET_SERIES_ALL_FIELDS

}
