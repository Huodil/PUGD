import gql from 'graphql-tag';

const Get_All_Categories_Borrowers = gql`
  query{GetAllCategoriesBorrowers
  {
            _id
            dureeadhesion
            agemin
            agemax
            namecategoriesbrrowers
        }
    }
`;

const GET_GROUPS_BY_NAME= gql`
    query($Name_CatBr : String){
        GetAllCategBorrowers(Name_CatBr:$Name_CatBr){
            _id
            namecategoriesbrrowers
        }
    }
`;

module.exports = {
    Get_All_Categories_Borrowers,
    GET_GROUPS_BY_NAME
}
