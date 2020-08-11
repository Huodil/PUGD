import gql from 'graphql-tag';

const GET_ALL_GROUPS = gql`
    query{
        GetAllGrroups{
            _id,
            group,
            responsable{
              last_name,
              first_name
            }
           currentLoan,
           currentReservation,
           membersCount
            __typename
        }
    }
`;

const GroupsByName = gql`
    query($name: String!){
        GetGroupsByName(name: $name){
            _id
            name,
            created_at,
            responsable{
                _id
                bar_code,
                first_name,
                last_name,
                birthday,
                
            },
            members{
              _id,
              bar_code,
              last_name,
              first_name,
              total_pret,
              total_reservation,
                
            }
        }
    }
`;
module.exports = {
    GET_ALL_GROUPS,
    GroupsByName,
};
