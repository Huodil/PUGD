import gql from 'graphql-tag';

const GET_ALL_AUTHORITIES = gql`
query(
  $all_fields:String!,
  $skip:Int,
  $limit:Int
){
GetAllAuthorities(
  all_fields:$all_fields,
  skip:$skip,
  limit:$limit
){
       ... on AuthorTypeOutput {
        _id
        name: name_auth
      }
      ... on CategoryType {
        _id
        name
      }
      ... on PublisherType {
        _id
        name
      }
      ... on ClassNumberType {
        _id
        name
      }
      ... on SubSeriesType {
        _id
        name
      }
      ... on SeriesType {
        _id
        name:title
      }
      ... on UniformTitleTypeAuthorities {
        _id
        name
      }
      ... on CollectionTitle {
        _id
        name:title
      }
}
}
`;

module.exports = {
  GET_ALL_AUTHORITIES,
}
