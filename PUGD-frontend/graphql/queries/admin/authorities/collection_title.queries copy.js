import gql from 'graphql-tag';

const GET_COLLECTION_TITLE = gql`
query(
    $Id: String,
    $Title: String,
    $Url_thumbnail: String,
    $Linked_authorities: [String] ,
  ){
  collection_title(  
    Id:$Id,
    Title:$Title,
    Url_thumbnail:$Url_thumbnail,
    Linked_authorities:$Linked_authorities)
    {
        _id
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
        title
        url_thumbnail
    }
}
`;


module.exports = {
  GET_COLLECTION_TITLE

}
