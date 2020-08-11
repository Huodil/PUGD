import gql from 'graphql-tag';

const INSERT_COLLECTION_TITLE = gql`
mutation(
            $Title: String,
            $Url_thumbnail: String,
            $Linked_authorities: [AuthorityLinkInputType] ,
  ){
  InsertCollectionTitle(  
            Title:$Title,
            Url_thumbnail:$Url_thumbnail,
            Linked_authorities:$Linked_authorities)
}
`;

const UPDATE_COLLECTION_TITLE = gql`
mutation(
            $ID :String!,
            $Title: String,
            $Url_thumbnail: String,
            $Linked_authorities: [AuthorityLinkInputType] ,
){

UpdateCollectionTitle(
            _id:$ID,
            Title:$Title,
            Url_thumbnail:$Url_thumbnail,
            Linked_authorities:$Linked_authorities
)
}
`;

const DELETE_COLLECTION_TITLE = gql`
mutation(
  $ID :String!,
){

DeleteCollectionTitle(
  _id:$ID,
)
}
`;

module.exports = {
  INSERT_COLLECTION_TITLE,
  UPDATE_COLLECTION_TITLE,
  DELETE_COLLECTION_TITLE
}
