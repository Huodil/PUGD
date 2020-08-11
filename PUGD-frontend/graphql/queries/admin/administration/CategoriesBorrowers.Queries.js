import gql from "graphql-tag";

const GET_ALL_CATEGORIES_BORROWERS = gql`
 query{
  GetAllCategoriesBorrowers{
    _id,
    name
    agemax,
    agemin,
    dureeadhesion
    __typename
  }  
}
`;

module.exports = {
    GET_ALL_CATEGORIES_BORROWERS,

}