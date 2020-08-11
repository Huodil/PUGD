import gql from 'graphql-tag';



const GET_ALL_STATIC_CODES = gql`
 
query{
    GetAllCodeStatics{
    _id
    static_name
  }
}
`;

module.exports = {
    GET_ALL_STATIC_CODES,

}