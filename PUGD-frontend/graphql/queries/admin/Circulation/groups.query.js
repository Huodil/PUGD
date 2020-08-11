import gql from 'graphql-tag';

const GetAllGrroups = gql`
    query{
        GetAllGrroups{
            _id,
            namegroups,
            CreatedAt,
            respgroup,
            letterrappel,
            libellegroup,
            mailRappel,
        }
    }
`;

const GroupsByName = gql`
    query($name: String!){
        GetGroupsByName(name: $name){
            _id
            namegroups,
            CreatedAt,
            respgroup{
                fullname,
                _id
            },
            letterrappel,
            mailRappel,
            libellegroup,
            MembersBrrowers{
                _id,
                fullname,
                barcode
            }
        }
    }
`;
module.exports = {
    GetAllGrroups,
    GroupsByName,
};
