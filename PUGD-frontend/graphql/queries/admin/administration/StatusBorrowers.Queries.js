import gql from 'graphql-tag';



const GET_ALL_STATUS_BORROWERS = gql`
 
query{
  GetAllStatusBorrowers{
    _id,
    status_name,
    is_autorized_for_access_to_list_borrowerd,
    is_autorized_for_borrowerd,
    is_autorized_for_changed_password,
    is_autorized_for_connected_opac,
    is_autorized_for_dsi,
    is_autorized_for_dsi_privat,
    is_autorized_for_historique_pret,
    is_autorized_for_request_prolongation,
    is_autorized_for_reservation,
    is_autorized_for_sarche,
    status_name,
    __typename
  }
}
`;

module.exports = {
    GET_ALL_STATUS_BORROWERS,

}
