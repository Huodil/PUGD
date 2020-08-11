import gql from 'graphql-tag';

const GET_CATEGORY = gql`
query(
  $Id : String,
  $Name : String,
  $Scope_note : String,
  $Comment : String,
  $Authority_number : Int,
  $URL_thumbnail : String,
){
  category_authority(
  Id:$Id
  Name:$Name,
  Scope_note:$Scope_note,
  Comment:$Comment,
  Authority_number:$Authority_number,
  URL_thumbnail:$URL_thumbnail)
  {
    
    _id
    authority_number
    broader_term{
      _id 
      broader_term 
      name
    }
    comment
    name 
    record
    scope_note
    url_thumbnail
    see_also {
      _id 
      broader_term 
      name
    }
    see {
      _id 
      broader_term 
      name
    }
    broader_term {
      _id 
      broader_term 
      name
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
}
}
`;
const GET_CATEGORY_ALL_FIELDS = gql`

query(
  $all_fields : String!,
){
category_all_fields(
    all_fields:$all_fields
)
  {
_id
    authority_number
    broader_term{
      _id 
      broader_term 
      name
    }
    comment
    name 
    record
    scope_note
    url_thumbnail
    see_also {
      _id 
      broader_term 
      name
    }
    see {
      _id 
      broader_term 
      name
    }
    broader_term {
      _id 
      broader_term 
      name
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
}
}


`;


module.exports = {
  GET_CATEGORY,
  GET_CATEGORY_ALL_FIELDS

}
