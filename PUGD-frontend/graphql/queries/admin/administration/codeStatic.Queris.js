import gql from "graphql-tag";

const GET_ALL_CODE_STATUS = gql`
 
query{
  GetAllCodeStatics{
    _id
    static_name
  }
}
`;

module.exports = {
    GET_ALL_CODE_STATUS,

}
