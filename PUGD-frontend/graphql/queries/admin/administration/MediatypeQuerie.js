import gql from 'graphql-tag';

const GET_MEDIATYPES = gql`
query{
    GetAllMediaTypes{
    _id,
    media_types_name
    dure_pret,
    dure_reservation,
    owner{
      _id
    }
    __typename
  }
}
`;

module.exports = {
    GET_MEDIATYPES,

}
