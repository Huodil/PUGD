import gql from 'graphql-tag';

const GET_CLASS_NUMBER = gql`
query(
  $Name:String,
  $Id:String,
  $Subject_description:String,
  $Url_thumbnail:String,
  $Linked_authorities: [String],
  ){
    class_number(
      Id:$Id,
      Name : $Name,
      Subject_description : $Subject_description,
      Url_thumbnail : $Url_thumbnail,
      Linked_authorities : $Linked_authorities,
  )
    {
      _id
      name
      subject_description
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
// const GET_CLASS_NUMBER_ALL_FIELDS = gql`
 
// query(
//   $all_fields : String!,
// ){
//   sub_series_all_fields(
//   all_fields:$all_fields
// )
//   {
//     _id
//     name
//     subject_description
//     url_thumbnail
//     linked_authorities
// }
// }

// `;


module.exports = {
  GET_CLASS_NUMBER

}
