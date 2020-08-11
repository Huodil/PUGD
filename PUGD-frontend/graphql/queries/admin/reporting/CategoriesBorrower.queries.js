import gql from 'graphql-tag';

const GET_All_CATEGORIES = gql`
    query{ GetAllCategoriesBorrowers
    {

        dureeadhesion
        agemin
        agemax
        namecategoriesbrrowers
    }
    }
`;



module.exports = {
    GET_All_CATEGORIES,

}