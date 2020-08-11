import gql from 'graphql-tag';

const ALL_BORROWERS = gql`
    query($name: String){
        GetAllBorrowers(filter: $name){
            _id,
            first_name,
            last_name,
            bar_code
            localisation{
                Name,
                __typename
            }               
        }
    }
`;
const BorrowersByName = gql`
    query($last: String!){
       GetBorrowersByName(last : $lastname){
         _id,
            firstname,
            email,
            gender
      
        }
    }
`;
module.exports = {
    ALL_BORROWERS,
    BorrowersByName
}
